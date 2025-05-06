<script setup>
import check from "./Icons/check.vue";
import start from "./Icons/start.vue";
import { useRouter } from "vue-router";
const router = useRouter();

function goLesson(id) {
  const currentIndex = props.nextVideo.findIndex(
    (video) => Number(video.id) === id
  );

  let remainingIds;
  if (currentIndex > -1) {
    remainingIds = props.nextVideo
      .slice(currentIndex + 1)
      .map((video) => Number(video.id));
  }
 
  router.push({
    name: "Lesson",
    params: { id },
    query: {
      list: JSON.stringify(remainingIds),
    },
  });
}
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      title: "",
    }),
  },
  nextVideo: {
    type: Array,
    default: [],
  },
});
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
        @click="goLesson(data.id)"
        class="text-lg transition duration-300 opacity-60"
      >
        <start />
      </span>
    </div>
  </div>
</template>
