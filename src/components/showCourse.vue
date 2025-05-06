<script setup>
import useCourse from "@/stores/course.pinia";
import useCore from "@/stores/core.pinia";
import progressCard from "./progress.vue";
import lessonCard from "./lessonCard.vue";
import chevron from "./Icons/chevron.vue";
import { storeToRefs } from "pinia";
const emit = defineEmits(["show", "hide"]);
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      title: "",
    }),
  },
  opened: {
    type: Boolean,
    default: false,
  },
});
const coursePinia = useCourse();
const core = useCore();
const { lesson } = storeToRefs(coursePinia);
const { loadingUrl } = storeToRefs(core);
const handleClick = () => {
  if (!props.opened) {
    emit("show");
  } else {
    emit("hide");
  }
};
</script>
<template>
  <div v-if="data?.lessons?.length">
    
    <div
      @click="handleClick"
      class="p-3 text-sm bg-dark-120 rounded-lg flex justify-between items-center w-full"
    >
      <span class="opacity-80">
        {{ data.name }}
      </span>
      <span
        class="text-2xl transition duration-300 opacity-50"
        :class="opened && 'rotate-90'"
      >
        <chevron />
      </span>
    </div>
    <template v-if="opened">
      <div class="flex flex-col gap-2 px-4 mt-3">
        <progressCard :progress="data.progress" />
        <template v-for="item in data.lessons">
          <lessonCard :data="item" :nextVideo="data.lessons" />
        </template>
      </div>
    </template>
  </div>
</template>
<style scoped></style>
