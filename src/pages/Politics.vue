<script setup>
import useMedia from "@/stores/media.pinia";
import useCore from "@/stores/core.pinia";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const mediaPinia = useMedia();
const core = useCore();
const { loadingUrl } = storeToRefs(core);
const { politics } = storeToRefs(mediaPinia);
const selected = ref(0);

function changeSelected(val) {
  selected.value = val;
}
function download(fileUrl) {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileUrl.split("/").pop(); // Optional: use filename from URL
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

onMounted(() => {
  mediaPinia.getPolitics();
  const tg = window.Telegram.WebApp;

  tg.BackButton.show();
   tg.BackButton.onClick(() => {
    
    router.push({name:'More'})
  });
});
</script>
<template>
  <div class="text-white px-2.5 py-4 overflow-y-hidden">
    <div
      class="flex w-full mb-10 overflow-x-auto h-auto overflow-y-hidden items-center gap-2"
    >
      <div
        @click="changeSelected(i)"
        class="text-sm min-w-max font-semibold px-4 py-1 border rounded-2xl border-dark-200 bg-dark-210"
        v-for="(item, i) in politics"
        :key="item.id"
        :class="selected == i && 'border-[#eaeaea] text-dark-200 bg-white'"
      >
        {{ item?.title }}
      </div>
    </div>
    <h2 class="text-xl font-semibold mb-6">
      {{ politics?.[selected]?.title }}
    </h2>
    <div v-html="politics?.[selected]?.description" class=""></div>
    <template v-if="politics?.[selected]?.files">
      <button
        @click="download(politics?.[selected]?.files)"
        class="w-full bg-blue-500 rounded-3xl text-base mt-5 h-10 font-semibold text-center flex justify-center items-center"
      >
        Скачать файл
      </button>
    </template>
  </div>
</template>
