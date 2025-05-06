<script setup>
import useCourse from "@/stores/course.pinia";
import useCore from "@/stores/core.pinia";
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
    coursePinia.getLesson(props?.data?.id);
  } else {
    emit("hide");
  }
};
</script>
<template>
  <div>
    <div
      class="p-3 text-sm bg-dark-120 rounded-lg flex justify-between items-center w-full"
    >
      <span class="opacity-80">
        {{ data.title }}
      </span>
      <span
        class="text-2xl transition duration-300 opacity-50"
        :class="opened && 'rotate-90'"
        @click="handleClick"
      >
        <chevron />
      </span>
    </div>
    <template v-if="opened">
      <a-spin :spinning="loadingUrl.has('lesson/detaile/')" class="!bg-dark-120 ">
        <div class="flex flex-col gap-2 px-2.5 mt-3">
          <lessonCard :data="lesson" />
        </div>
      </a-spin>
    </template>
  </div>
</template>
