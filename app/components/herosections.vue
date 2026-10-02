<template>
  <section class="hero-section relative isolate mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:min-h-[650px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-12 lg:py-20">
    <div class="hero-copy relative z-10">
      <div class="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-slate-300">
        <span class="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"></span>
        Building thoughtful digital experiences
      </div>

      <p class="mb-3 text-sm font-semibold uppercase text-blue-300">Full-stack app and Web developer</p>
      <h1 class="max-w-3xl text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
        Hi, I'm
        <span class="hero-name">
          <span
            v-for="(word, w) in nameParts"
            :key="w"
            class="hero-name-word"
          >
            <span
              v-for="letter in word"
              :key="letter.index"
              class="hero-name-letter"
              :class="{ 'is-visible': letter.index <= currentLetter }"
              :style="{ '--n': letter.index }"
            >{{ letter.char }}</span>
          </span>
        </span>
      </h1>
      <p class="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
        I craft full-stack applications and creative digital experiences, bringing thoughtful ideas to life on the web.
      </p>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <NuxtLink to="/myprojects" class="hero-primary inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white transition duration-300">
          Explore my work
          <ArrowUpRightIcon class="h-4 w-4" />
        </NuxtLink>
        <NuxtLink to="/contact" class="inline-flex items-center rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-200 transition duration-300 hover:border-white/30 hover:bg-white/[0.07]">
          Get in touch
        </NuxtLink>
      </div>

      <div class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
        <a href="https://github.com/San2021331091" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 transition hover:text-white">
          <CodeBracketIcon class="h-4 w-4" /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/santosh-saha-02685542a/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 transition hover:text-white">
          <ArrowTopRightOnSquareIcon class="h-4 w-4" /> LinkedIn
        </a>
        <a href="https://www.facebook.com/santosh.saha.146257" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 transition hover:text-white">
          <ArrowTopRightOnSquareIcon class="h-4 w-4" /> Facebook
        </a>
      </div>
    </div>

    <div class="hero-portrait relative mx-auto w-full max-w-[390px] lg:mr-8">
      <div class="portrait-frame relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-blue-950/40">
        <img
          src="https://i.postimg.cc/wjFVvKSM/img.jpg"
          alt="Santosh Saha"
          class="h-full w-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#080b16]/80 via-transparent to-transparent"></div>
        <div class="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
          <div>
            <p class="text-lg font-semibold text-white">Santosh Saha</p>
            <p class="mt-1 text-sm text-slate-300">Developer &amp; creative thinker</p>
          </div>
          <SparklesIcon class="mb-1 h-5 w-5 shrink-0 text-violet-300" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowTopRightOnSquareIcon, ArrowUpRightIcon, CodeBracketIcon, SparklesIcon } from '@heroicons/vue/24/outline'

const nameWords: string[] = ['Santosh', 'Saha.']

// Split each word into letters, with a running index across the whole name
let counter = 0
const nameParts = nameWords.map((word) =>
  word.split('').map((char) => ({ char, index: counter++ })),
)
const totalLetters = counter

const currentLetter = ref<number>(-1)

const STEP_MS = 150      // time between letters
const HOLD_TICKS = 12    // how long the full name stays visible (12 * 150ms = 1.8s)

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  // Respect reduced motion: show the full name and don't loop
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    currentLetter.value = totalLetters - 1
    return
  }

  let step = -1

  timer = setInterval(() => {
    step++

    if (step < totalLetters) {
      currentLetter.value = step          // reveal next letter
    } else if (step >= totalLetters + HOLD_TICKS) {
      currentLetter.value = -1            // hide all and start over
      step = -1
    }
    // otherwise: hold with the full name visible
  }, STEP_MS)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.hero-copy {
  animation: reveal-up 700ms both;
}

.hero-portrait {
  animation: reveal-up 850ms 120ms both;
}

.hero-name {
  white-space: normal;
}

/* Each word stays together so wrapping only happens between words */
.hero-name-word {
  display: inline-block;
  white-space: nowrap;
}

.hero-name-word + .hero-name-word {
  margin-left: 0.25em;
}

/* Letters fade/slide in via the JS timer, while the gradient + glow loop forever */
.hero-name-letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(0.35em);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-out;

  color: transparent;
  background: linear-gradient(110deg, #93c5fd 0%, #818cf8 24%, #c4b5fd 48%, #818cf8 72%, #93c5fd 100%);
  background-size: 280% 100%;
  background-clip: text;
  -webkit-background-clip: text;

  animation:
    name-gradient 3.2s ease-in-out infinite alternate,
    name-glow 1.8s ease-in-out infinite alternate;
  /* Offset per letter so the color and glow ripple across the name */
  animation-delay: calc(var(--n) * -0.15s);
}

.hero-name-letter.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes name-gradient {
  from { background-position: 0% 50%; }
  to   { background-position: 100% 50%; }
}

@keyframes name-glow {
  from { filter: drop-shadow(0 0 0 rgb(129 140 248 / 0)); }
  to   { filter: drop-shadow(0 0 10px rgb(129 140 248 / 0.65)); }
}

.hero-primary {
  background: linear-gradient(110deg, #2563eb, #6d4be8 58%, #8055d9);
  box-shadow: 0 8px 26px rgb(66 79 215 / 25%);
}

.hero-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgb(92 77 224 / 38%);
}

.portrait-frame {
  box-shadow: 0 30px 80px rgb(37 52 130 / 24%);
}

@keyframes reveal-up {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-copy,
  .hero-portrait {
    animation: none;
  }

  .hero-name-letter {
    animation: none;
    transition: none;
  }
}
</style>