<script setup>
import useAuth from "@/stores/auth.pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const auth = useAuth();
const router = useRouter();

onMounted(() => {
  const tg = window.Telegram.WebApp;
  const initData = tg.initData;

  console.log(initData);
  //   auth.postLogin({ initData }, () => {
  //     router.push({ name: "Dashboard" });
  //   });
});
</script>
<template>
  <div
    class="min-h-screen overflow-y-hidden w-full flex items-center justify-center"
  >
    <a-spin :spinning="true" size="large"></a-spin>
  </div>
</template>
