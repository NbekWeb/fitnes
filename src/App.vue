<script setup>
import { onMounted } from "vue";
onMounted(() => {
  const tg = window.Telegram.WebApp;
  const initData = tg.initData;
  console.log(initData);
  // const params = new URLSearchParams(initData);
  // const referral_code = params.get("start_param") || "";

  // loginPinia.postLogin({ initData, referral_code }, () => {
  //   router.push({ name: "Earn" });
  // });
});
</script>

<template>
  <div class="bg-black min-h-dvh w-full">
    <router-view />
  </div>
</template>

<style scoped></style>
