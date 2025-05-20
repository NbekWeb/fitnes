<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted ,onUnmounted} from "vue";
import { storeToRefs } from "pinia";
import useCourse from "@/stores/course.pinia";
import useCore from "@/stores/core.pinia";
import progressComp from "@/components/progress.vue";
import showCourse from "@/components/showCourse.vue";
import lessonCard from "@/components/lessonCard.vue";
import downloadIcon from "@/components/Icons/download.vue";
import chevron from "@/components/Icons/chevron.vue";

const route = useRoute();
const router = useRouter();

const core = useCore();
const coursePinia = useCourse();
const { loadingUrl } = storeToRefs(core);
const { course, lesson } = storeToRefs(coursePinia);
const opened = ref(-1);

function changeOpened(val = -1) {
  opened.value = val;
}
function donloadFile(url) {
  const link = document.createElement("a");
  link.href = url;
  link.download = url.split("/").pop();
  link.target = "_blank";
  link.click();
}

onMounted(() => {
  if (!route.params.id) {
    router.push({ name: "Dashboard" });
  } else {
    coursePinia.getCourse(route.params.id);
  }
  const tg = window.Telegram.WebApp;
  tg.ready();

  tg.BackButton.show();
  tg.BackButton.onClick(() => {
    router.push({ name: "Dashboard" });
  });
});
onUnmounted(() => {
  const tg = window.Telegram.WebApp;
  tg.BackButton.hide();
});
</script>
<template>
  <a-spin :spinning="loadingUrl.has('course/detaile/')">
    <div class="min-h-dvh text-white px-2.5 py-3">
      <h3 class="text-center font-semibold text-xl pb-2">
        {{ course?.name }}
      </h3>
      <h4 class="font-semibold text-base mb-2">Прогресс обучения</h4>
      <progress-comp :progress="course.progress" />
      <div class="mt-4 flex flex-col gap-3">
        <template v-for="(item, i) in course?.course_lesson">
          <template v-if="item?.lessons?.length">
            <showCourse
              :opened="opened == i"
              :data="item"
              @show="changeOpened(i)"
              @hide="changeOpened"
            />
          </template>
          <lessonCard v-else :data="item" />
        </template>
        <div class="flex mt-3 gap-5 items-center justify-between">
          <button
            v-if="course.file"
            class="flex hover:cursor-pointer gap-1 text-sm items-center font-semibold"
            @click="donloadFile(course.file)"
          >
            <download-icon class="text-base" />
            Загрузка курса
          </button>
          <a
            v-if="course.link"
            :href="course.link"
            class="flex hover:cursor-pointer gap-1 text-sm items-center font-semibold text-white bg-blue-500 px-2.5 rounded-2xl py-1"
            target="_blank"
          >
            Перейти по ссылке
            <chevron class="text-base" />
          </a>
        </div>
      </div>
    </div>
  </a-spin>
</template>
