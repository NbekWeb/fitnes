<script setup>
import support from "./Icons/support.vue";
import home from "./Icons/home.vue";
import add from "./Icons/add.vue";
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import close from "./Icons/close.vue";

import useMedia from "@/stores/media.pinia";

const mediaPinia = useMedia();
const route = useRoute();
const router = useRouter();
const open = ref(false);
const helpForm = ref();

function onClose() {
  open.value = false;
}
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
function goTo(val = "main") {
  if (!val) {
    router.push({ name: "Dashboard" });
  } else if (val == "tg") {
    open.value = true;
  } else if (val == "more") {
    router.push({ name: "More" });
  } else {
    router.push({ name: "Dashboard" });
  }
}
function submitHelp() {
  helpForm.value.validate().then(() => {
    mediaPinia.postSupport({ description: formState.message }, () => {
      formState.message = "";
    });
  });
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
    <a-drawer
      placement="bottom"
      :closable="false"
      :open="open"
      @close="onClose"
      height="auto"
    >
      <div class="">
        <h3 class="font-semibold text-xl">ПОМОЩЬ</h3>
        <span
          class="opacity-70 text-2xl absolute -top-6 right-1.5 p-1 rounded-full bg-dark-120"
          @click="onClose"
        >
          <close />
        </span>
        <div class="pb-5">
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
        </div>
      </div>
    </a-drawer>
  </div>
</template>
