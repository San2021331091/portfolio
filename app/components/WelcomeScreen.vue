
<template>
  <main
    class="welcome-screen"
    aria-label="Santosh Saha portfolio introduction"
  >
    <canvas ref="canvas" class="welcome-canvas" aria-hidden="true"></canvas>
    <div class="screen-grain" aria-hidden="true"></div>

    <div class="orb orb-one" aria-hidden="true"></div>
    <div class="orb orb-two" aria-hidden="true"></div>

    <header class="screen-header">
      <span class="availability">
        <span class="availability-dot"></span>
        Independent developer
      </span>
      <span class="edition">Portfolio <span>·</span> 2026</span>
    </header>

    <section class="intro-copy">
      <div class="intro-panel">
        <p class="eyebrow">
          <span>01</span> A personal universe
        </p>

        <h1>
          Ideas,<br />
          <em>in motion.</em>
        </h1>

        <p class="intro-description">
          Santosh Saha<br />
          Developer &amp; creative thinker
        </p>

        <div class="cta-row">
          <NuxtLink to="/myprojects" class="primary-cta">
            View projects
          </NuxtLink>

          <NuxtLink to="/contact" class="secondary-cta">
            Let’s connect
          </NuxtLink>
        </div>

        <ul class="metric-row" aria-label="Key statistics">
          <li><strong>6+</strong><span>Years</span></li>
          <li><strong>24</strong><span>Launches</span></li>
          <li><strong>∞</strong><span>Curiosity</span></li>
        </ul>
      </div>
    </section>

    <aside class="floating-card" aria-label="Current focus">
      <span class="floating-badge">
        Available for product design
      </span>

      <div class="mini-display">
        <span class="label">Current focus</span>
        <strong>Next-gen web experiences</strong>
      </div>
    </aside>

    <footer class="screen-footer">
      <span class="footer-label">
        Designing &amp; building for the web
      </span>

      <span class="flight-status">
        <span class="status-line"></span>
        Entering orbit
      </span>
    </footer>

    <div class="launch-progress" aria-hidden="true">
      <span></span>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const canvas = ref<HTMLCanvasElement | null>(null)

let renderer: THREE.WebGLRenderer | null = null
let resizeObserver: ResizeObserver | null = null
let animationFrame = 0

onMounted(() => {
  const element = canvas.value
  if (!element) return

  try {
    renderer = new THREE.WebGLRenderer({
      canvas: element,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    })
  } catch {
    return
  }

  const scene = new THREE.Scene()

  const camera = new THREE.OrthographicCamera(
    -5, 5, 5, -5, 0.1, 100
  )

  camera.position.z = 20

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.6)
  )

  renderer.setSize(
    element.clientWidth,
    element.clientHeight
  )

  renderer.outputColorSpace = THREE.SRGBColorSpace

  scene.add(
    new THREE.HemisphereLight(0xb6c3ff, 0x0d1124, 2.1)
  )

  const keyLight = new THREE.DirectionalLight(0x9d8cff, 3.5)
  keyLight.position.set(-3, 5, 8)
  scene.add(keyLight)

  const stars = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: 0xcfe2ff,
      size: 0.035,
      transparent: true,
      opacity: 0.8,
    })
  )

  scene.add(stars)

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(2.7, 48, 32),
    new THREE.MeshStandardMaterial({
      color: 0x1d2a4d,
      roughness: 0.82,
      metalness: 0.12,
    })
  )

  earth.position.set(1.4, -6.7, -2)
  scene.add(earth)

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(2.78, 48, 32),
    new THREE.MeshBasicMaterial({
      color: 0x8a8dff,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
    })
  )

  atmosphere.position.copy(earth.position)
  scene.add(atmosphere)

  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(3.18, 0.012, 3, 120),
    new THREE.MeshBasicMaterial({
      color: 0xa38dff,
      transparent: true,
      opacity: 0.38,
    })
  )

  orbit.position.copy(earth.position)
  orbit.rotation.set(0.82, 0.18, -0.16)
  scene.add(orbit)

  // Rocket
  const rocket = new THREE.Group()

  const hullMaterial = new THREE.MeshStandardMaterial({
    color: 0xe9ecff,
    roughness: 0.28,
    metalness: 0.42,
  })

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: 0x7a83ff,
    roughness: 0.35,
    metalness: 0.38,
  })

  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x202c4a,
    roughness: 0.28,
    metalness: 0.6,
  })

  const hull = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.27, 1.15, 20),
    hullMaterial
  )

  rocket.add(hull)

  const nose = new THREE.Mesh(
    new THREE.ConeGeometry(0.2, 0.48, 20),
    accentMaterial
  )

  nose.position.y = 0.81
  rocket.add(nose)

  const cockpitWindow = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 16, 12),
    new THREE.MeshStandardMaterial({
      color: 0xa9d9ff,
      emissive: 0x4473cc,
      emissiveIntensity: 0.8,
      metalness: 0.35,
      roughness: 0.18,
    })
  )

  cockpitWindow.position.set(0, 0.18, 0.2)
  rocket.add(cockpitWindow)

  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.245, 0.245, 0.09, 20),
    darkMaterial
  )

  band.position.y = -0.36
  rocket.add(band)

  for (const side of [-1, 1]) {
    const fin = new THREE.Mesh(
      new THREE.ConeGeometry(0.19, 0.42, 3),
      accentMaterial
    )

    fin.position.set(side * 0.2, -0.48, 0)
    fin.rotation.z = side * -0.68
    rocket.add(fin)

    const booster = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.095, 0.7, 12),
      hullMaterial
    )

    booster.position.set(side * 0.29, -0.13, -0.02)
    rocket.add(booster)
  }

  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(0.18, 0.82, 16),
    new THREE.MeshBasicMaterial({
      color: 0x9ec7ff,
      transparent: true,
      opacity: 0.9,
    })
  )

  flame.position.y = -0.98
  flame.rotation.z = Math.PI
  rocket.add(flame)

  const flameCore = new THREE.Mesh(
    new THREE.ConeGeometry(0.09, 0.48, 12),
    new THREE.MeshBasicMaterial({
      color: 0xd9c2ff,
      transparent: true,
      opacity: 0.92,
    })
  )

  flameCore.position.y = -0.92
  flameCore.rotation.z = Math.PI
  rocket.add(flameCore)

  const engineGlow = new THREE.PointLight(0x93bdff, 4.2, 3.8)
  engineGlow.position.y = -0.86
  rocket.add(engineGlow)

  scene.add(rocket)

  const viewport = { halfWidth: 5 }

  const resize = () => {
    const width = element.clientWidth
    const height = element.clientHeight

    if (!width || !height || !renderer) return

    const aspect = width / height

    viewport.halfWidth = 5 * aspect

    camera.left = -viewport.halfWidth
    camera.right = viewport.halfWidth
    camera.top = 5
    camera.bottom = -5
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)

    const starPositions = new Float32Array(900 * 3)

    for (let index = 0; index < 900; index++) {
      starPositions[index * 3] =
        (Math.random() * 2 - 1) * viewport.halfWidth * 1.15

      starPositions[index * 3 + 1] =
        (Math.random() * 2 - 1) * 5.4

      starPositions[index * 3 + 2] =
        -5 + Math.random() * 2
    }

    stars.geometry.dispose()
    stars.geometry = new THREE.BufferGeometry()

    stars.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3)
    )

    const earthX = aspect < 0.8
      ? 0.2
      : Math.min(viewport.halfWidth * 0.3, 1.8)

    earth.position.x = earthX
    atmosphere.position.x = earthX
    orbit.position.x = earthX
  }

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(element)
  resize()

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  const startedAt = performance.now()

  const render = (now: number) => {
    if (!renderer) return

    const elapsed = (now - startedAt) / 1000

    const progress = reducedMotion
      ? 0.32
      : THREE.MathUtils.clamp(
          (elapsed - 0.65) / 4.1,
          0,
          1
        )

    const flight = progress * progress * (3 - 2 * progress)

    rocket.position.set(
      THREE.MathUtils.lerp(
        viewport.halfWidth < 4 ? 0.25 : 1.3,
        viewport.halfWidth * 0.38,
        flight
      ),
      THREE.MathUtils.lerp(-3.15, 5.6, flight),
      1
    )

    rocket.rotation.z = -0.34 - flight * 0.1

    flame.scale.y = 0.82 + Math.sin(elapsed * 17) * 0.12

    flameCore.scale.y =
      0.8 + Math.sin(elapsed * 23 + 0.8) * 0.16

    engineGlow.intensity =
      3 + Math.sin(elapsed * 19) * 0.8

    stars.rotation.z = elapsed * 0.002

    renderer.render(scene, camera)

    if (!reducedMotion) {
      animationFrame = window.requestAnimationFrame(render)
    }
  }

  render(startedAt)
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(animationFrame)

  resizeObserver?.disconnect()

  renderer?.dispose()
  renderer = null
})
</script>

<style>
:global(*) {
  box-sizing: border-box;
}

:global(html),
:global(body),
:global(#__nuxt) {
  width: 100%;
  min-height: 100%;
  margin: 0;
  background: linear-gradient(
    135deg,
    #050a30 0%,
    #101b55 35%,
    #312078 70%,
    #5426a8 100%
  );
}

.welcome-screen {
  --paper: #f4efff;
  --muted: #b4b9e8;
  --signal: #a78bfa;
  --signal-strong: #c4b5fd;
  --panel-border: rgba(196, 181, 253, 0.2);

  position: relative;
  width: 100%;
  min-height: 100vh;
  height: 100dvh;
  overflow: hidden;
  isolation: isolate;
  color: var(--paper);

  background:
    radial-gradient(
      circle at 15% 15%,
      rgba(59, 130, 246, 0.45),
      transparent 38%
    ),
    radial-gradient(
      circle at 85% 20%,
      rgba(147, 51, 234, 0.4),
      transparent 40%
    ),
    radial-gradient(
      circle at 50% 100%,
      rgba(79, 70, 229, 0.35),
      transparent 45%
    ),
    linear-gradient(
      135deg,
      #050a30 0%,
      #101b55 40%,
      #312078 75%,
      #5426a8 100%
    );
}

.welcome-canvas,
.screen-grain,
.orb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.welcome-canvas {
  z-index: -2;
  pointer-events: none;
}

.screen-grain {
  z-index: 0;
  pointer-events: none;
  opacity: 0.12;
  background-image: radial-gradient(
    rgba(231, 239, 255, 0.38) 0.6px,
    transparent 0.8px
  );
  background-size: 5px 5px;
  mask-image: linear-gradient(90deg, black, transparent 82%);
}

.orb {
  z-index: 0;
  pointer-events: none;
  filter: blur(60px);
  opacity: 0.5;
}

.orb-one {
  transform: translate(-12%, 20%);
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.45),
    transparent 55%
  );
}

.orb-two {
  transform: translate(55%, -15%);
  background: radial-gradient(
    circle,
    rgba(168, 85, 247, 0.4),
    transparent 50%
  );
}

.screen-header,
.screen-footer {
  position: absolute;
  z-index: 3;
  left: clamp(24px, 5.5vw, 84px);
  right: clamp(24px, 5.5vw, 84px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.screen-header {
  top: clamp(24px, 4.5vh, 48px);
}

.screen-footer {
  bottom: clamp(26px, 5vh, 52px);
  color: var(--muted);
}

.availability,
.flight-status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.availability-dot,
.status-line {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9af1c6, #5ae4a5);
  box-shadow: 0 0 18px rgba(94, 221, 149, 0.8);
}

.edition {
  color: var(--muted);
}

.edition span {
  padding: 0 5px;
  color: var(--signal);
}

.intro-copy {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: clamp(24px, 11.5vw, 176px);
  width: min(560px, 58vw);
  transform: translateY(-50%);
  animation: arrive 950ms cubic-bezier(0.22, 0.8, 0.2, 1) both;
}

.intro-panel {
  position: relative;
  padding: clamp(1.15rem, 2vw, 2rem);
  border: 1px solid var(--panel-border);
  border-radius: 30px;
  background: linear-gradient(
    135deg,
    rgba(40, 50, 120, 0.4),
    rgba(20, 16, 60, 0.25)
  );
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 28px 70px rgba(4, 6, 35, 0.4);
}

.intro-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    120deg,
    rgba(168, 180, 255, 0.12),
    transparent 28%,
    transparent 72%,
    rgba(192, 132, 252, 0.12)
  );
  pointer-events: none;
}

.eyebrow {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 22px;
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.eyebrow span {
  color: var(--signal-strong);
}

h1 {
  position: relative;
  margin: 0;
  color: var(--paper);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(62px, 8vw, 118px);
  font-weight: 400;
  line-height: 0.84;
  letter-spacing: -0.06em;
  text-shadow: 0 0 30px rgba(166, 180, 255, 0.15);
}

h1 em {
  color: #c4b5fd;
  font-style: normal;
  font-weight: 400;
}

.intro-description {
  position: relative;
  margin: 26px 0 0;
  color: #d7ddff;
  font-size: 14px;
  line-height: 1.8;
}

.cta-row {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}

.primary-cta,
.secondary-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0.8rem 1.2rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}

.primary-cta {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  box-shadow: 0 16px 32px rgba(99, 102, 241, 0.35);
}

.secondary-cta {
  background: rgba(255, 255, 255, 0.06);
  color: var(--paper);
}

.primary-cta:hover,
.secondary-cta:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.3);
}

.metric-row {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 26px 0 0;
  padding: 0;
  list-style: none;
}

.metric-row li {
  padding: 0.82rem 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
}

.metric-row strong {
  display: block;
  font-size: clamp(1.15rem, 1.8vw, 1.8rem);
  color: var(--paper);
}

.metric-row span {
  display: block;
  margin-top: 4px;
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.floating-card {
  position: absolute;
  right: clamp(24px, 8vw, 86px);
  bottom: 26%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: min(260px, 28vw);
  padding: 1rem 1rem 0.9rem;
  border: 1px solid rgba(196, 181, 253, 0.2);
  border-radius: 22px;
  background: rgba(30, 27, 75, 0.5);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 26px 56px rgba(5, 6, 40, 0.4);
  animation: float 6s ease-in-out infinite;
}

.floating-badge {
  display: inline-flex;
  align-self: flex-start;
  padding: 0.38rem 0.75rem;
  border-radius: 999px;
  background: rgba(139, 92, 246, 0.18);
  color: #e9ddff;
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.mini-display {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mini-display .label {
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.mini-display strong {
  color: var(--paper);
  font-size: clamp(1rem, 1.3vw, 1.35rem);
  line-height: 1.3;
}

.status-line {
  width: 28px;
  height: 1px;
  border-radius: 0;
  background: linear-gradient(90deg, #a78bfa, #60a5fa);
  box-shadow: none;
}

.launch-progress {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: rgba(238, 233, 255, 0.12);
}

.launch-progress span {
  display: block;
  width: 100%;
  height: 100%;
  transform: scaleX(0);
  transform-origin: left;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #c084fc);
  animation: progress 5s linear forwards;
}

@keyframes arrive {
  from {
    opacity: 0;
    transform: translate3d(0, 24px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, -50%, 0);
  }
}

@keyframes progress {
  to {
    transform: scaleX(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 960px) {
  .floating-card {
    right: 26px;
    bottom: 20%;
    min-width: 215px;
  }
}

@media (max-width: 640px) {
  .screen-header,
  .screen-footer {
    font-size: 9px;
    letter-spacing: 0.07em;
  }

  .intro-copy {
    top: auto;
    bottom: 15%;
    left: 20px;
    width: calc(100% - 40px);
    transform: none;
  }

  .intro-panel {
    padding: 1rem;
  }

  h1 {
    font-size: clamp(64px, 19vw, 88px);
  }

  .intro-description {
    margin-top: 18px;
    font-size: 13px;
  }

  .cta-row {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-cta,
  .secondary-cta {
    width: 100%;
  }

  .metric-row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .floating-card {
    display: none;
  }

  .footer-label {
    max-width: 42%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .intro-copy,
  .floating-card,
  .launch-progress span {
    animation: none;
  }
}
</style>