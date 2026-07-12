<script setup>
  import { RouterView } from 'vue-router';
  import { useAuthStore } from './stores/userAuth';

  const userStore  = useAuthStore()

  userStore.restore()
</script>

<template>
  <v-app>
  <RouterView/>
  </v-app>
  

</template>

