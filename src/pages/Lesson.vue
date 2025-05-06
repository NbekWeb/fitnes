<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, nextTick } from "vue";
import { storeToRefs } from "pinia";
import useCourse from "@/stores/course.pinia";
import useCore from "@/stores/core.pinia";
import progressComp from "@/components/progress.vue";
import showCourse from "@/components/showCourse.vue";
import nextIcon from "@/components/Icons/next.vue";
import start from "@/components/Icons/start.vue";

const route = useRoute();
const router = useRouter();

const core = useCore();
const coursePinia = useCourse();
const { loadingUrl } = storeToRefs(core);
const { lesson } = storeToRefs(coursePinia);
const videoStarted = ref(false);
const timeCode = ref(false);
const videoRef = ref(null);

const toggleTime = () => {
  timeCode.value = !timeCode.value;
};
const startVideo = () => {
  videoStarted.value = true;
  nextTick(() => {
    videoRef.value?.play();
  });
};
const goThisTime = (timestamp) => {
    if (!videoStarted.value) {
      videoStarted.value = true;
    }
  if (!videoRef.value) return;
  const [hours, minutes, seconds] = timestamp.split(":").map(Number);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  videoRef.value.currentTime = totalSeconds;
  videoRef.value.play();
  console.log("dabba");
};

onMounted(() => {
  if (!route.params.id) {
    router.push({ name: "Dashboard" });
  } else {
    coursePinia.getLesson(route.params.id);
  }
});
</script>
<template>
  <a-spin :spinning="loadingUrl.has('lesson/detaile/')">
    <div class="min-h-dvh text-white px-2.5 py-3">
      <div class="w-full mt-2 mb-4">
        <img
          v-show="!videoStarted"
          class="w-full rounded-lg cursor-pointer"
          :src="lesson.image"
          @click="startVideo"
        />
        <video
          v-show="videoStarted"
          class="w-full rounded-lg"
          :src="lesson.video"
          ref="videoRef"
          controls
          controlsList="nodownload "
        />
      </div>
      <div class="bg-dark-120 rounded-lg p-2.5 text-sm mb-3">
        <p>
          {{ lesson.title }}
        </p>
        <div v-if="lesson?.video_section?.length">
          <div
            @click="toggleTime"
            class="flex font-semibold items-center gap-2 text-base"
          >
            <span> ТАЙМКОДЫ </span>
            <start
              class="text-min transition duration-300"
              :class="timeCode ? '-rotate-90' : 'rotate-90 '"
            />
          </div>
          <div class="flex flex-col gap-0 py-3 text-sm" v-if="timeCode">
            <div class="" v-for="item in lesson?.video_section">
              <span class="text-blue-800" @click="goThisTime(item.timestamp)">
                {{ item.timestamp.split(":").slice(1).join(":") }}
              </span>

              <span class="opacity-60">
                {{ " " }} -
                {{ item.section_name }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <button
        class="w-full text-base flex gap-2 items-center bg-blue-500 justify-center h-10 rounded-3xl font-medium"
      >
        ДАЛЕЕ <nextIcon class="text-xl" />
      </button>
    </div>
  </a-spin>
</template>
