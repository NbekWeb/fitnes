<script setup>
import { onMounted } from "vue";
import useAuth from "./stores/auth.pinia";


</script>

<template>
  <div class="bg-black min-h-dvh w-full">
    <router-view />
  </div>
</template>

<style scoped></style>
