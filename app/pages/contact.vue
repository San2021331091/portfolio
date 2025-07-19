<template>  
  <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">

    <h1 class="text-3xl font-bold text-center mb-8 text-white">Contact Me</h1>

    <!-- Contact Info & Form in Grid with full violet gradient -->
    <div 
      class="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-2xl shadow-lg p-6 text-white"
    >
      <!-- Contact Info -->
      <div class="space-y-4">
        <div>
          <h2 class="text-xl font-semibold mb-2">Get in Touch</h2>
          <p><strong>Email:</strong> santoshsaha2003@gmail.com</p>
          <p><strong>Phone:</strong> +8801874926802</p>
          <p><strong>Location:</strong> Sylhet, Bangladesh</p>
        </div>
        <div class="text-sm">
          I usually reply within 24 hours. Feel free to reach out.
        </div>
      </div>

      <!-- Contact Form with violet background and white text -->
      <form 
        class="space-y-4 border border-white/20 rounded-lg p-6"
        @submit.prevent="submitForm"
      >
        <div>
          <label for="name" class="block text-sm font-medium">Name</label>
        <input
  type="text"
  id="name"
  v-model="form.name"
  placeholder="Your name"
  class="mt-1 w-full px-4 py-2 border border-white/30 rounded-lg bg-white text-blue-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium">Email</label>
            <input
  type="email"
  id="email"
  v-model="form.email"
  placeholder="Your email"
  class="mt-1 w-full px-4 py-2 border border-white/30 rounded-lg bg-white text-blue-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
        </div>

        <div>
          <label for="message" class="block text-sm font-medium">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            class="mt-1 w-full px-4 py-2 border border-white/30 rounded-lg bg-white text-blue-700 placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Your message"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full bg-violet-700 text-white font-semibold py-2 rounded-lg hover:bg-opacity-90 transition"
        >
          Send Message
        </button>
      </form>
    </div>

    <!-- Spacer before footer -->
    <div class="h-20"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import emailjs from 'emailjs-com'
import { useHead, useRuntimeConfig } from '#imports'

useHead({
  title: 'Contact Me',
})


const form = reactive({
  name: '',
  email: '',
  message: '',
})

const submitForm = () => {
  if (!form.name || !form.email || !form.message) {
    alert('Please fill in all fields.')
    return
  }

 const templateParams = {
  user_name: form.name,
  user_email: form.email,
  message: form.message,
}


  const config = useRuntimeConfig().public

emailjs.send(
  config.EMAILJS_SERVICE_ID as string,
  config.EMAILJS_TEMPLATE_ID as string,
  templateParams,
  config.EMAILJS_PUBLIC_KEY as string
).then(() => {
      alert('Message sent successfully!')
      form.name = ''
      form.email = ''
      form.message = ''
    })
    .catch((error) => {
      console.error('EmailJS Error:', error)
      alert('Failed to send message. Please try again later.')
    })
}

</script>

