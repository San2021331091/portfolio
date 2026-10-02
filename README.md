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

The blog pages automatically fill the store to at least two AI-generated articles when a visitor opens the site. The Node server also publishes one new AI-generated article daily at 09:00 UTC by default. The daily task runs once on server startup if today's run was missed, and saves its last run date alongside the blog store to avoid duplicate daily posts.

Configure the schedule and timezone with these server-only variables:

```env
NUXT_OPENROUTER_API_KEY=your_openrouter_api_key
NUXT_BLOGS_STORAGE_FILE=.data/blog-posts.json
NUXT_BLOG_GENERATION_CRON="0 9 * * *"
NUXT_BLOG_GENERATION_TIMEZONE=UTC
```

Keep the OpenRouter key private and never add it to client-side code. The API key is available from OpenRouter's settings.

Published articles and the daily run state are stored beside `.data/blog-posts.json` by default. For Render, attach a persistent disk and set `NUXT_BLOGS_STORAGE_FILE` to a path on that disk (for example, `/var/data/blog-posts.json`) so posts and schedule state survive deployments. The scheduler runs inside the Node web service, so it requires an awake server; sleeping or stopped instances cannot run cron tasks while offline. Static hosting and `npm run generate` cannot run the AI endpoints or scheduler.

---

## 🚀 Deployment

This site is deployed using [Render](https://render.com/). The AI draft endpoint requires a Render web service running the Nuxt Node server, not a static site service.

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
