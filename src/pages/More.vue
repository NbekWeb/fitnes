<script setup>
import tg from "@/components/Icons/tg.vue";
import yt from "@/components/Icons/yt.vue";
import insta from "@/components/Icons/insta.vue";
import docs from "@/components/Icons/docs.vue";
import mediaComp from "@/components/media.vue";
import settings from "@/components/Icons/settings.vue";
import { onMounted, ref } from "vue";
import useMedia from "@/stores/media.pinia";
import { storeToRefs } from "pinia";

const mediaPinia = useMedia();
const { medias } = storeToRefs(mediaPinia);

const mediaData = ref([
  {
    icon: yt,
    label: "YouTube",
  },
  {
    icon: tg,
    label: "Telegram",
  },
  {
    icon: insta,
    label: "Instagram",
  },
]);

const helps = ref({
  icon: settings,
  label: "Техническая проблема",
});

const docData=ref({
  icon:docs,
  label:'Договор и политика'
})

function goMedia(val){
  window.open("https://t.me/arzumanov_r", "_blank");
}


onMounted(() => {
  mediaPinia.getMedia();
});
</script>
<template>
  <div class="px-2.5 pt-4 text-white">
    <h1 class="text-xl font-semibold">Ещё</h1>
    <div class="flex flex-col gap-5 mt-5">
      <div class="flex flex-col gap-1">
        <h2 class="text-base font-semibold">Помощь</h2>
        <div class="flex flex-col gap-2">
          <mediaComp :data="helps" />
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <h2 class="text-base font-semibold">Информация</h2>
        <div class="flex flex-col gap-2">
          <mediaComp :data="docData" />
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <h2 class="text-base font-semibold">Медиаплощадки проекта</h2>
        <div class="flex flex-col gap-2">
          <mediaComp
            v-for="(item, i) in mediaData"
            :data="item"
            :key="i"
            :border="i != 0"
          />
        </div>
      </div>
    </div>
  </div>
</template>
