<script setup>
import { onMounted } from "vue";
onMounted(() => {
  const tg = window.Telegram.WebApp;
  const initData = tg.initData;
  // console.log(initData);

  loginPinia.postLogin({ initData }, () => {
    router.push({ name: "Dashboard" });
  });
});
</script>

<template>
  <div class="bg-black min-h-dvh w-full">
    <router-view />
  </div>
</template>

<style scoped></style>
