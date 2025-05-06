<script setup>
import tg from "@/components/Icons/tg.vue";
import yt from "@/components/Icons/yt.vue";
import insta from "@/components/Icons/insta.vue";
import docs from "@/components/Icons/docs.vue";
import mediaComp from "@/components/mediaComp.vue";
import settings from "@/components/Icons/settings.vue";
import { onMounted, ref, shallowRef, reactive } from "vue";
import useMedia from "@/stores/media.pinia";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const mediaPinia = useMedia();
const router=useRouter()
const { medias } = storeToRefs(mediaPinia);
const full = ref(false);

const mediaData = shallowRef([
  {
    icon: yt,
    label: "YouTube",
    val: "youtube",
  },
  {
    icon: tg,
    label: "Telegram",
    val: "telegram",
  },
  {
    icon: insta,
    label: "Instagram",
    val: "instagram",
  },
]);
const helpForm = ref();
const formState = reactive({
  message: "",
});
const rules = {
  message: [
    {
      required: true,
      message: "Пожалуйста, опишите проблему",
      trigger: "blur",
    },
  ],
};

function submitHelp() {
  helpForm.value.validate().then(() => {
    mediaPinia.postSupport({ description: formState.message }, () => {
      formState.message = "";
      showFull();
    });
  });
}
function goPolitics() {
  router.push({ name: "Politics" });
}
function goMediaLink(val) {
  const media = medias.value?.find((m) => m.platform === val);
  window.open(media?.url, "_blank");
}
const helps = shallowRef({
  icon: settings,
  label: "Техническая проблема",
});

const docData = shallowRef({
  icon: docs,
  label: "Договор и политика",
});

function showFull() {
  full.value = !full.value;
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
          <mediaComp :data="helps" @action="showFull" :show="full" />
          <template v-if="full">
            <a-form :model="formState" :rules="rules" ref="helpForm">
              <a-form-item name="message">
                <a-textarea
                  v-model:value="formState.message"
                  :rows="5"
                  class="bg-transparent text-white"
                  placeholder="Информация о проблеме"
                />
              </a-form-item>
            </a-form>
            <button
              class="h-10 w-full text-base font-semibold bg-blue-500 rounded-3xl"
              @click="submitHelp"
            >
              ОТПРАВИТЬ ДАННЫЕ
            </button>
          </template>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <h2 class="text-base font-semibold">Информация</h2>
        <div class="flex flex-col gap-2">
          <mediaComp :data="docData" @action="goPolitics" />
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
            @action="goMediaLink(item.val)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
textarea::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>
