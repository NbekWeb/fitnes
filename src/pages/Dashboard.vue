<script setup>
import User from "@/components/User.vue";
import down from "@/components/Icons/down.vue";
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useRouter } from "vue-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import courseCard from "@/components/courseCard.vue";
import courseSkelton from "@/components/courseSkelton.vue";
import useAuth from "@/stores/auth.pinia";
import useCourse from "@/stores/course.pinia";
import useCore from "@/stores/core.pinia";
import { storeToRefs } from "pinia";

const auth = useAuth();
const core = useCore();
const coursePinia = useCourse();
const router = useRouter();

const { courseAll, recomendations, courseDashoard } = storeToRefs(coursePinia);
const { loadingUrl } = storeToRefs(core);

const less = ref(false);
const selectedCourse = ref("my");
const courses = [
  {
    val: "my",
    label: "Мои ",
  },
  {
    val: "trenovka",
    label: "Тренировки  ",
  },
  {
    val: "zaryadka",
    label: "Зарядки  ",
  },
];

function goCourse(id, youtube) {
  if (!youtube) {
    router.push({ name: "SingleCourse", params: id });
  } else {
    window.open(youtube, "_blank");
  }
}
function giveLess() {
  less.value = !less.value;
}
function changeCourse(val) {
  selectedCourse.value = val;
}

onMounted(() => {
  auth.getUser();
  coursePinia.getRecomendation();
  coursePinia.getCourseAll();
  coursePinia.getCourseUser();
  coursePinia.getCourse(1);
  coursePinia.getLesson(1);
});
</script>
<template>
  <div class="text-white">
    <div class="px-2.5">
      <User class="" />
      <div class="">
        <div
          class="flex gap-1 font-semibold items-center text-sm hover:cursor-pointer opacity-90 hover:opacity-100 transition-all duration-300 pb-1.5"
          @click="giveLess"
        >
          Рекомендуем
          <down
            class="text-xl transition-transform duration-300 ease-in-out"
            :class="!less && '-rotate-180 '"
          />
        </div>
        <div class="py-3" :class="less && 'hidden'">
          <Swiper :slides-per-view="1.5" :space-between="20" class="rounded-lg">
            <template v-for="i in recomendations">
              <SwiperSlide
                class="bg-transparent"
                @click="goCourse(i.id, i.you_tube)"
              >
                <img
                  :src="i.image"
                  class="h-auto w-full object-contain rounded-xl"
                />
              </SwiperSlide>
            </template>
          </Swiper>
        </div>
      </div>
    </div>
    <div class="mt-2 px-2.5 bg-dark-180 rounded-t-lg pt-2">
      <p class="font-semibold text-xl">Обучающие материалы</p>
      <div class="flex gap-1 overflow-x-auto mb-3.5">
        <template v-for="item in courses">
          <button
            class="px-4 flex items-center min-w-max h-8 rounded-2xl border bg-dark-100 border-dark-200"
            :class="
              selectedCourse == item.val &&
              'border-white bg-white text-dark-100'
            "
            @click="changeCourse(item.val)"
          >
            {{ item.label }}
          </button>
        </template>
      </div>
      <div class="flex flex-col gap-2 pb-10">
        <template v-if="!loadingUrl.has('courseDashoard')">
          <template v-if="courseDashoard?.length != 0">
            <courseCard
              :data="item?.course"
              v-for="(item, i) in courseDashoard"
              :key="i"
            />
          </template>
          <div
            class="flex flex-col items-center gap-2.5 mt-4 text-sm"
            v-else-if="selectedCourse == 'my'"
          >
            <span class="text-xl font-semibold">Список пуст </span>
            <p class="opacity-90">
              Совершите покупку или выберите бесплатный продукт!
            </p>
          </div>
        </template>
        <template>
          <courseSkelton v-for="i in 4" />
        </template>
      </div>
    </div>
   
  </div>
</template>
<style scoped></style>
