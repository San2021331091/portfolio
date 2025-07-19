<template>
  <div class="m-auto p-4 sm:p-6">
    <Herosections />
    
    <Featuredprojects title="Featured Projects"/>

    <Latestblogs title="Latest Blogs"/>
  
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports';
import Featuredprojects from '~/components/featuredprojects.vue';
import Herosections from '~/components/herosections.vue'
import Latestblogs from '~/components/latestblogs.vue';

useHead({
  title: 'Home'
})
</script>
