---

# 🌐 Personal Portfolio – Built with Nuxt 4,HTML 5,Tailwind CSS 4.1.11, and Vue 3


This is my personal portfolio website, designed and developed to showcase my skills, projects, and professional experience. The application is built using modern frontend technologies including **Nuxt 4**,**HTML 5**,**Vue 3**, and **Tailwind CSS 4.1.11**, and demonstrates my ability to develop performant, responsive, and visually engaging user interfaces.

---

## 🛠️ Tech Stack Overview

### ⚙️ Core Frameworks & Libraries

| Technology              | Description                                                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nuxt 4**              | A powerful Vue-based meta-framework for server-side rendering (SSR), static site generation (SSG), and high-performance frontend applications. |
| **Vue 3**               | The progressive JavaScript framework used to build interactive and modular UI components.                                                      |
| **Vue Router**          | Handles client-side navigation between pages and views.                                                                                        |
| **Tailwind CSS 4.1.11**        | Utility-first CSS framework for rapid UI development with built-in responsive design.                                                          |
| **HTML 5**        | HTML5 (Hypertext Markup Language 5) is a markup language used for structuring and presenting hypertext documents on the World Wide Web.                                          |
| **@nuxtjs/tailwindcss** | Official Nuxt module for seamless Tailwind CSS integration.                                                                                    |
| **@heroicons/vue**      | Scalable SVG icon library from Tailwind Labs used throughout the UI.                                                                           |
| **@vueuse/motion**      | Vue 3 animation library for smooth motion effects and transitions.                                                                             |
| **Three.js**            | JavaScript 3D library used to render the animated welcome scene.                                                                                |
---

### ✉️ Email Integration

| Package              | Description                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **@emailjs/browser** | Enables sending emails directly from the browser using the EmailJS API (used for contact forms). |
| **emailjs-com**      | Legacy version of the EmailJS SDK (optional/alternative use).                                    |

---

### 🧰 Development Tools

| Tool             | Description                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------ |
| **TypeScript**   | Enhances JavaScript with static types for better tooling and reliability.                  |
| **ts-node**      | Allows running TypeScript files directly in Node.js.                                       |
| **tsx**          | A fast TypeScript runtime for scripting and development.                                   |
| **PostCSS**      | CSS processor used alongside Tailwind for additional CSS tooling.                          |
| **Autoprefixer** | Automatically adds vendor prefixes to ensure cross-browser compatibility.                  |
| **Concurrently** | Enables running multiple npm scripts at once (useful for multitasking during development). |

---

## 📜 NPM Scripts

```json
"scripts": {
  "build": "nuxt build",             // Builds the production-ready app
  "dev": "nuxt dev",                 // Starts the local development server
  "generate": "nuxt generate",       // Generates a static version of the app
  "preview": "nuxt preview",         // Previews the generated static site
  "postinstall": "nuxt prepare",     // Nuxt-specific post-install setup
  "dev:all": "npm run dev"           // Shortcut to start development
}
```

## AI Blog Generation

The blog pages automatically fill the store to at least two AI-generated articles when a visitor opens the site. A daily server scheduler publishes one new article at 09:00 UTC by default. It checks for an article already published that day and catches up once when the server starts.

Set these server-only variables in Render:

```env
NUXT_OPENROUTER_API_KEY=your_openrouter_api_key
NUXT_BLOGS_STORAGE_FILE=/var/data/blog-posts.json
NUXT_BLOG_GENERATION_CRON="0 9 * * *"
NUXT_BLOG_GENERATION_TIMEZONE=UTC
```

Keep the OpenRouter key private and never add it to client-side code. Attach a persistent disk to the Render web service at `/var/data`; generated posts are written to the configured file and must live on that disk to survive deploys and restarts. Local development can continue to use `.data/blog-posts.json`.

Deploy this as a Render **Node Web Service**, not a Static Site. Use `npm ci && npm run build` as the build command and `node .output/server/index.mjs` as the start command. The daily scheduler requires the web service to remain running; sleeping or stopped instances cannot run the schedule while offline. Render persistent disks require a paid web-service plan and limit the service to one instance.

---

## 🚀 Deployment

This site is deployed using [Render](https://render.com/). The AI blog API and daily scheduler require a Render Node Web Service with a persistent disk, not a static site.

* 🔗 **Live Site**: [https://portfolio-qx6l.onrender.com](https://portfolio-qx6l.onrender.com)

---

## 💡 Project Purpose

This portfolio project demonstrates:

* Expertise in Nuxt and Vue.js for building modern web interfaces
* Mastery of Tailwind CSS for responsive and elegant UI design
* Integration of external APIs like EmailJS for real-world interactivity
* Ability to deploy and maintain a production-grade frontend project

---

[Backend Repository Link](https://github.com/San2021331091/flask-admin)
