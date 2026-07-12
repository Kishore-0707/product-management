<script setup>
import { onMounted, reactive, ref } from "vue";
import { useAuthStore } from "@/stores/userAuth";
import navt from "@/components/nav.vue";
import Login from "@/components/login.vue";

const userStore = useAuthStore();

onMounted(() => {
  console.log("Fetching users !!");
  userStore.fetchUsers();
});
</script>

<template>
  <navt />
  <Login />
  
</template>