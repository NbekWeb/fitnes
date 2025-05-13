<script setup>
import support from "./Icons/support.vue";
import home from "./Icons/home.vue";
import add from "./Icons/add.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
function goTo(val = "main") {
  if (!val) {
    router.push({ name: "Dashboard" });
  } else if (val == "tg") {
    window.open("https://t.me/arzumanov_r", "_blank");
  } else if (val == "more") {
    router.push({ name: "More" });
  } else {
    router.push({ name: "Dashboard" });
  }
}
</script>
<template>
  <div
    class="flex text-white text-sm px-5 font-medium fixed bottom-0 bg-black py-2.5 left-0 w-full items-center justify-between"
  >
    <div
      class="flex flex-col gap-2 items-center opacity-90"
      @click="goTo('tg')"
    >
      <support class="text-2xl" />
      <span>ПОМОЩЬ</span>
    </div>
    <div
      class="flex flex-col gap-2 items-center"
      :class="route.name !== 'Dashboard' && 'opacity-90'"
      @click="goTo"
    >
      <home class="text-2xl" />
      <span>ГЛАВНАЯ</span>
    </div>
    <div
      class="flex flex-col gap-2 items-center"
      :class="route.name !== 'More' && 'opacity-90'"
      @click="goTo('more')"
    >
      <add class="text-2xl" />
      <span>ЕЩЁ</span>
    </div>
  </div>
</template>
