<template>
  <article v-if="article" class="mx-auto max-w-3xl px-5 py-12 text-white sm:px-8">
    <NuxtLink to="/blogs" class="inline-flex text-sm text-emerald-200 transition hover:text-emerald-100">
      All articles
    </NuxtLink>

    <header class="mt-8 border-b border-white/10 pb-7">
      <p class="text-xs uppercase text-slate-400">{{ article.date }} <span class="px-2 text-emerald-300">·</span> {{ article.readTime }} read</p>
      <h1 class="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">{{ article.title }}</h1>
      <p class="mt-5 text-lg leading-7 text-slate-300">{{ article.excerpt }}</p>
    </header>

    <div class="article-copy mt-9" v-html="article.contentHtml"></div>
  </article>

  <section v-else class="mx-auto max-w-3xl px-5 py-20 text-center text-slate-300 sm:px-8">
    <h1 class="text-2xl font-semibold">Article unavailable</h1>
    <NuxtLink to="/blogs" class="mt-4 inline-flex text-sm text-emerald-200 underline underline-offset-4">
      Return to the blog
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { useHead } from '#imports'
import type { BlogArticle } from '~/types/projects'

const route = useRoute()
const slug = typeof route.params.slug === 'string' ? route.params.slug : ''
const { data: article } = await useFetch<BlogArticle>(`/api/blogs/${encodeURIComponent(slug)}`)

useHead(() => ({ title: article.value?.title ?? 'Blog Article' }))
</script>

<style scoped>
.article-copy {
  color: #d3dbd6;
  font-size: 16px;
  line-height: 1.85;
}

.article-copy :deep(h2),
.article-copy :deep(h3),
.article-copy :deep(h4) {
  margin: 2em 0 0.65em;
  color: #f3f4ed;
  font-weight: 600;
  line-height: 1.3;
}

.article-copy :deep(h2) {
  font-size: 1.6rem;
}

.article-copy :deep(h3) {
  font-size: 1.25rem;
}

.article-copy :deep(p),
.article-copy :deep(ul),
.article-copy :deep(ol),
.article-copy :deep(blockquote),
.article-copy :deep(pre),
.article-copy :deep(table) {
  margin: 1.1em 0;
}

.article-copy :deep(ul),
.article-copy :deep(ol) {
  padding-left: 1.5rem;
}

.article-copy :deep(li) {
  margin: 0.35em 0;
}

.article-copy :deep(a) {
  color: #9ce6c2;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.article-copy :deep(code) {
  border-radius: 4px;
  background: rgb(255 255 255 / 8%);
  padding: 0.15em 0.35em;
  color: #e2c994;
  font-size: 0.9em;
}

.article-copy :deep(pre) {
  overflow-x: auto;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 6px;
  background: #0d1318;
  padding: 1rem;
}

.article-copy :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
}

.article-copy :deep(blockquote) {
  border-left: 2px solid #70c99e;
  padding-left: 1rem;
  color: #aebbb3;
}

.article-copy :deep(table) {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
}

.article-copy :deep(th),
.article-copy :deep(td) {
  border: 1px solid rgb(255 255 255 / 14%);
  padding: 0.55rem 0.75rem;
  text-align: left;
}
</style>
