import { skillGroups } from '../../app/data/skills'

interface OpenRouterResponse {
  model?: string
  choices?: Array<{
    finish_reason?: string | null
    message?: {
      content?: string | Array<{ text?: string }> | null
    }
  }>
}

interface GeneratedDraft {
  title?: unknown
  excerpt?: unknown
  contentMarkdown?: unknown
}

export interface SkillBlogDraft {
  title: string
  excerpt: string
  contentMarkdown: string
  readTime: string
}

function parseMarkdownDraft(content: string): GeneratedDraft | undefined {
  const markdown = content.trim().replace(/^```(?:markdown|md)?\s*/i, '').replace(/\s*```$/, '')
  const lines = markdown.split(/\r?\n/)
  const titleIndex = lines.findIndex(line => line.trim())
  if (titleIndex < 0) return undefined

  const title = lines[titleIndex].trim().replace(/^#{1,6}\s*/, '').replace(/\*\*/g, '')
  const contentMarkdown = lines.slice(titleIndex + 1).join('\n').trim()
  const excerpt = contentMarkdown
    .split(/\n\s*\n/)
    .map(paragraph => paragraph.replace(/^\s*(?:#{1,6}\s*|>\s*|[-*]\s*)/gm, '').trim())
    .find(Boolean)

  if (!title || !excerpt || contentMarkdown.length < 300) return undefined
  return { title, excerpt, contentMarkdown }
}

const openRouterModels = [
  'qwen/qwen3.8-27b:free',
  'google/gemma-4-31b-it:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
] as const

async function fetchOpenRouterDraft(
  apiKey: string,
  model: string,
  skillContext: string,
  topic: string,
): Promise<{ content: string, completion: OpenRouterResponse }> {
  const completion = await $fetch<OpenRouterResponse>('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    timeout: 90_000,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: {
      model,
      max_tokens: 3000,
      temperature: 0.65,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: [
            'You are a careful technical editor creating a useful educational blog article for Santosh Saha.',
            'Use the listed skills as the author’s known technical background.',
            'Do not invent personal projects, employment, years of experience, test results, or achievements.',
            'Explain technical concepts accurately and distinguish general guidance from personal experience.',
            'Write a focused article of about 600 to 850 words in clear Markdown.',
            'Return only a JSON object with string fields: title, excerpt, contentMarkdown.',
            'The contentMarkdown field must contain the complete article and must not repeat the title as an H1.',
          ].join(' '),
        },
        {
          role: 'user',
          content: [
            `Known skills:\n${skillContext}`,
            topic ? `Requested topic: ${topic}` : 'Choose one specific, useful topic based on these skills.',
          ].join('\n\n'),
        },
      ],
    },
  })

  const responseContent = completion.choices?.[0]?.message?.content
  const content = typeof responseContent === 'string'
    ? responseContent.trim()
    : Array.isArray(responseContent)
      ? responseContent.map(part => part.text ?? '').join('\n').trim()
      : ''

  return { content, completion }
}

export async function generateSkillBlogDraft(apiKey: string, topic = ''): Promise<SkillBlogDraft> {
  const skillContext = skillGroups
    .map(group => `${group.title}: ${group.skills.map(skill => skill.label).join(', ')}`)
    .join('\n')

  let lastError: unknown
  for (const model of openRouterModels) {
    try {
      for (let attempt = 0; attempt < 2; attempt++) {
        const { content, completion } = await fetchOpenRouterDraft(apiKey, model, skillContext, topic)

        if (!content || !completion) {
          const modelName = completion?.model ? ` from ${completion.model}` : ''
          const finishReason = completion?.choices?.[0]?.finish_reason
          const finishDetails = finishReason ? ` (${finishReason})` : ''
          throw createError({
            statusCode: 502,
            statusMessage: `OpenRouter returned no article text${modelName}${finishDetails} after a retry. Try again shortly.`,
          })
        }

        let generated: GeneratedDraft
        try {
          const jsonContent = content.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
          generated = JSON.parse(jsonContent) as GeneratedDraft
        } catch {
          const markdownDraft = parseMarkdownDraft(content)
          if (!markdownDraft) {
            throw createError({ statusCode: 502, statusMessage: 'OpenRouter returned neither valid JSON nor a complete Markdown article.' })
          }
          generated = markdownDraft
        }

        if (
          typeof generated.title !== 'string'
          || typeof generated.excerpt !== 'string'
          || typeof generated.contentMarkdown !== 'string'
          || !generated.title.trim()
          || !generated.excerpt.trim()
          || generated.contentMarkdown.trim().length < 300
        ) {
          throw createError({ statusCode: 502, statusMessage: 'OpenRouter returned an incomplete article.' })
        }

        const contentMarkdown = generated.contentMarkdown.trim().slice(0, 24000)
        const wordCount = contentMarkdown.split(/\s+/).length

        return {
          title: generated.title.trim().slice(0, 160),
          excerpt: generated.excerpt.trim().slice(0, 360),
          contentMarkdown,
          readTime: `${Math.max(1, Math.ceil(wordCount / 200))} min`,
        }
      }
    } catch (error) {
      lastError = error
      const upstream = error as { statusCode?: number; response?: { status?: number } }
      const statusCode = upstream.response?.status ?? upstream.statusCode

      if (statusCode === 429) {
        continue
      }

      if (statusCode === 401 || statusCode === 403) {
        throw createError({
          statusCode: 401,
          statusMessage: 'OpenRouter rejected the configured key. Replace it with a new server key.',
        })
      }

      if (statusCode === 502 || statusCode === 503 || statusCode === 504) {
        continue
      }
    }
  }

  const upstream = lastError as { statusCode?: number; response?: { status?: number } }
  const statusCode = upstream?.response?.status ?? upstream?.statusCode
  const statusMessage = statusCode === 401 || statusCode === 403
    ? 'OpenRouter rejected the configured key. Replace it with a new server key.'
    : statusCode === 429
      ? 'OpenRouter is rate-limited right now. Try again later.'
      : 'OpenRouter could not generate a valid article with the available free models. Try again shortly.'

  throw createError({
    statusCode: statusCode === 429 ? 429 : 502,
    statusMessage,
  })
}