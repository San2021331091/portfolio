export interface Skill {
  label: string
  logo: string
}

export interface SkillGroup {
  title: string
  headingClass: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    headingClass: 'text-blue-400',
    skills: [
      { label: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
      { label: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { label: 'Fortran', logo: 'https://i.postimg.cc/13zNtspc/Screenshot-2025-08-01-173525.png' },
      { label: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { label: 'Kotlin', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
      { label: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { label: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { label: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { label: 'Dart', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
      { label: 'C#', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { label: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { label: 'Go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
      { label: 'Dart', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
    ],
  },
  {
    title: 'Frontend',
    headingClass: 'text-green-400',
    skills: [
      { label: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { label: 'React Native', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { label: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { label: 'Jetpack Compose', logo: 'https://i.postimg.cc/jqkp9hMx/jetpackcompose-original-8x.png/' },
      { label: 'JavaFX', logo: 'https://i.postimg.cc/QxYnVN2j/javafx.png' },
      { label: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { label: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { label: 'Tailwind CSS', logo: 'https://i.postimg.cc/GpKLsyd4/twcss.png' },
      { label: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { label: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ],
  },
  {
    title: 'Backend & Tools',
    headingClass: 'text-purple-400',
    skills: [
      { label: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { label: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { label: 'Fastify', logo: 'https://i.postimg.cc/VkND8yv2/fastify.png/' },
      { label: 'Fiber', logo: 'https://i.postimg.cc/MKDLybgb/fiber.png' },
      { label: 'SlimPHP', logo: 'https://i.postimg.cc/8cPTHPkZ/Screenshot-2025-08-01-173707.png/' },
      { label: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
      { label: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { label: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { label: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { label: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { label: 'AWS', logo: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png' },
      { label: 'CI/CD', logo: 'https://i.postimg.cc/L4wyj49D/ci.png' },
    ],
  },
  {
    title: 'Fullstack Frameworks',
    headingClass: 'text-purple-400',
    skills: [
      { label: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { label: 'Nuxt.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg' },
    ],
  },
]
