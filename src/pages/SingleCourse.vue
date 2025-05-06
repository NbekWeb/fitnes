<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useCourse from "@/stores/course.pinia";
import useCore from "@/stores/core.pinia";
import progressComp from "@/components/progress.vue";
import showCourse from "@/components/showCourse.vue";

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

onMounted(() => {
  if (!route.params.id) {
    router.push({ name: "Dashboard" });
  } else {
    coursePinia.getCourse(route.params.id);
  }
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
          <showCourse
            :opened="opened == i"
            :data="item"
            @show="changeOpened(i)"
            @hide="changeOpened"
          />
        </template>
      </div>
    </div>
  </a-spin>
</template>
