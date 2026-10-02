<template>
  <main class="welcome-screen" aria-label="Santosh Saha portfolio introduction">
    <canvas ref="canvas" class="welcome-canvas" aria-hidden="true"></canvas>
    <div class="screen-grain" aria-hidden="true"></div>

    <header class="screen-header">
      <span class="availability"><span class="availability-dot"></span>Independent developer</span>
      <span class="edition">Portfolio <span>·</span> 2026</span>
    </header>

    <section class="intro-copy">
      <p class="eyebrow"><span>01</span> A personal universe</p>
      <h1>Ideas,<br /><em>in motion.</em></h1>
      <p class="intro-description">Santosh Saha<br />Developer &amp; creative thinker</p>
    </section>

    <footer class="screen-footer">
      <span class="footer-label">Designing &amp; building for the web</span>
      <span class="flight-status"><span class="status-line"></span>Entering orbit</span>
    </footer>
    <div class="launch-progress" aria-hidden="true"><span></span></div>
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
  const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 100)
  camera.position.z = 20

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
  renderer.setSize(element.clientWidth, element.clientHeight)
  renderer.outputColorSpace = THREE.SRGBColorSpace

  scene.add(new THREE.HemisphereLight(0xc8f6e8, 0x171d18, 2.1))
  const keyLight = new THREE.DirectionalLight(0xffc178, 3.2)
  keyLight.position.set(-3, 5, 8)
  scene.add(keyLight)

  const stars = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({ color: 0xc9ddd5, size: 0.035, transparent: true, opacity: 0.74 }),
  )
  scene.add(stars)

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(2.7, 48, 32),
    new THREE.MeshStandardMaterial({ color: 0x123a35, roughness: 0.82, metalness: 0.08 }),
  )
  earth.position.set(1.4, -6.7, -2)
  scene.add(earth)

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(2.78, 48, 32),
    new THREE.MeshBasicMaterial({ color: 0x67d4b0, transparent: true, opacity: 0.12, side: THREE.BackSide }),
  )
  atmosphere.position.copy(earth.position)
  scene.add(atmosphere)

  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(3.18, 0.012, 3, 120),
    new THREE.MeshBasicMaterial({ color: 0x83d9bc, transparent: true, opacity: 0.28 }),
  )
  orbit.position.copy(earth.position)
  orbit.rotation.set(0.82, 0.18, -0.16)
  scene.add(orbit)

  const rocket = new THREE.Group()
  const hullMaterial = new THREE.MeshStandardMaterial({ color: 0xe6e1d5, roughness: 0.32, metalness: 0.38 })
  const accentMaterial = new THREE.MeshStandardMaterial({ color: 0xd97742, roughness: 0.42, metalness: 0.26 })
  const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x273634, roughness: 0.3, metalness: 0.52 })

  const hull = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.27, 1.15, 20), hullMaterial)
  rocket.add(hull)

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.48, 20), accentMaterial)
  nose.position.y = 0.81
  rocket.add(nose)

  const cockpitWindow = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 16, 12),
    new THREE.MeshStandardMaterial({ color: 0x86d9d0, emissive: 0x327f77, emissiveIntensity: 0.7, metalness: 0.35, roughness: 0.18 }),
  )
  cockpitWindow.position.set(0, 0.18, 0.2)
  rocket.add(cockpitWindow)

  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.245, 0.09, 20), darkMaterial)
  band.position.y = -0.36
  rocket.add(band)

  for (const side of [-1, 1]) {
    const fin = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.42, 3), accentMaterial)
    fin.position.set(side * 0.2, -0.48, 0)
    fin.rotation.z = side * -0.68
    rocket.add(fin)

    const booster = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.095, 0.7, 12), hullMaterial)
    booster.position.set(side * 0.29, -0.13, -0.02)
    rocket.add(booster)
  }

  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(0.18, 0.82, 16),
    new THREE.MeshBasicMaterial({ color: 0xff9c51, transparent: true, opacity: 0.88 }),
  )
  flame.position.y = -0.98
  flame.rotation.z = Math.PI
  rocket.add(flame)

  const flameCore = new THREE.Mesh(
    new THREE.ConeGeometry(0.09, 0.48, 12),
    new THREE.MeshBasicMaterial({ color: 0xffe8ad, transparent: true, opacity: 0.92 }),
  )
  flameCore.position.y = -0.92
  flameCore.rotation.z = Math.PI
  rocket.add(flameCore)

  const engineGlow = new THREE.PointLight(0xff8342, 3.6, 3.4)
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
      starPositions[index * 3] = (Math.random() * 2 - 1) * viewport.halfWidth * 1.15
      starPositions[index * 3 + 1] = (Math.random() * 2 - 1) * 5.4
      starPositions[index * 3 + 2] = -5 + Math.random() * 2
    }
    stars.geometry.dispose()
    stars.geometry = new THREE.BufferGeometry()
    stars.geometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))

    const earthX = aspect < 0.8 ? 0.2 : Math.min(viewport.halfWidth * 0.3, 1.8)
    earth.position.x = earthX
    atmosphere.position.x = earthX
    orbit.position.x = earthX
  }

  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(element)
  resize()

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const startedAt = performance.now()
  const render = (now: number) => {
    if (!renderer) return
    const elapsed = (now - startedAt) / 1000
    const progress = reducedMotion ? 0.32 : THREE.MathUtils.clamp((elapsed - 0.65) / 4.1, 0, 1)
    const flight = progress * progress * (3 - 2 * progress)

    rocket.position.set(
      THREE.MathUtils.lerp(viewport.halfWidth < 4 ? 0.25 : 1.3, viewport.halfWidth * 0.38, flight),
      THREE.MathUtils.lerp(-3.15, 5.6, flight),
      1,
    )
    rocket.rotation.z = -0.34 - flight * 0.1
    flame.scale.y = 0.82 + Math.sin(elapsed * 17) * 0.12
    flameCore.scale.y = 0.8 + Math.sin(elapsed * 23 + 0.8) * 0.16
    engineGlow.intensity = 3 + Math.sin(elapsed * 19) * 0.8
    stars.rotation.z = elapsed * 0.002
    renderer.render(scene, camera)

    if (!reducedMotion) animationFrame = window.requestAnimationFrame(render)
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

<style scoped>
.welcome-screen {
  --ink: #080d0b;
  --paper: #eee9dc;
  --muted: #9ba9a0;
  --signal: #e89359;
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  isolation: isolate;
  color: var(--paper);
  background:
    radial-gradient(ellipse at 72% 82%, rgba(31, 91, 70, 0.3), transparent 36%),
    radial-gradient(ellipse at 78% 60%, rgba(178, 91, 48, 0.12), transparent 32%),
    var(--ink);
}

.welcome-canvas,
.screen-grain {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.welcome-canvas {
  z-index: -1;
}

.screen-grain {
  z-index: -1;
  pointer-events: none;
  opacity: 0.16;
  background-image: radial-gradient(rgba(231, 239, 229, 0.38) 0.55px, transparent 0.65px);
  background-size: 4px 4px;
  mask-image: linear-gradient(90deg, black, transparent 82%);
}

.screen-header,
.screen-footer {
  position: absolute;
  z-index: 1;
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
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #86d7a8;
  box-shadow: 0 0 13px rgba(134, 215, 168, 0.7);
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
  z-index: 1;
  top: 48%;
  left: clamp(24px, 11.5vw, 176px);
  width: min(470px, 52vw);
  transform: translateY(-50%);
  animation: arrive 900ms cubic-bezier(0.2, 0.72, 0.2, 1) both;
}

.eyebrow {
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
  color: var(--signal);
}

h1 {
  margin: 0;
  color: var(--paper);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(62px, 8.5vw, 116px);
  font-weight: 400;
  line-height: 0.86;
}

h1 em {
  color: #a9d9c1;
  font-weight: 400;
}

.intro-description {
  margin: 29px 0 0;
  color: #c2cbc4;
  font-size: 14px;
  line-height: 1.8;
}

.status-line {
  width: 28px;
  height: 1px;
  border-radius: 0;
  background: var(--signal);
  box-shadow: none;
}

.launch-progress {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: rgba(238, 233, 220, 0.12);
}

.launch-progress span {
  display: block;
  width: 100%;
  height: 100%;
  transform: scaleX(0);
  transform-origin: left;
  background: var(--signal);
  animation: progress 5s linear forwards;
}

@keyframes arrive {
  from { opacity: 0; transform: translate3d(0, calc(-50% + 18px), 0); }
  to { opacity: 1; transform: translate3d(0, -50%, 0); }
}

@keyframes progress {
  to { transform: scaleX(1); }
}

@media (max-width: 640px) {
  .screen-header,
  .screen-footer {
    font-size: 9px;
    letter-spacing: 0.07em;
  }

  .intro-copy {
    top: auto;
    bottom: 13%;
    left: 26px;
    width: calc(100% - 52px);
    transform: none;
  }

  h1 {
    font-size: clamp(64px, 18vw, 88px);
  }

  .intro-description {
    margin-top: 18px;
    font-size: 13px;
  }

  .footer-label {
    max-width: 42%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .intro-copy,
  .launch-progress span {
    animation: none;
  }
}
</style>
