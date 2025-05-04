<script setup>
import User from "@/components/User.vue";
import down from "@/components/Icons/down.vue";
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import courseCard from "@/components/courseCard.vue";
import courseSkelton from "@/components/courseSkelton.vue";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

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
function giveLess() {
  less.value = !less.value;
}
function changeCourse(val) {
  selectedCourse.value = val;
}
 const data={
  image:'https://unitee.fra1.digitaloceanspaces.com/biomachine-media/products/5e4b4c14-cf5b-4028-9991-c4d1da4c965b.jpg',
  progress:0
 }
</script>
<template>
  <div >
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
          <Swiper
            :slides-per-view="1.5"
            :space-between="20"
            :loop="true"
            class="rounded-lg"
          >
            <template v-for="i in 10">
              <SwiperSlide class="bg-transparent">
                <img
                  src="@/assets/img/k23.png"
                  class="h-auto w-full object-contain rounded-xl"
                />
              </SwiperSlide>
              <SwiperSlide class="bg-transparent">
                <img
                  src="@/assets/img/k2.png"
                  class="h-auto w-full object-contain rounded-xl"
                />
              </SwiperSlide>
              <SwiperSlide class="bg-transparent">
                <img
                  src="@/assets/img/k21.png"
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
      <div class="flex flex-col gap-2 pb-10 ">
        <template v-for="i in 3">
          <courseCard :data="data"/>
          <courseSkelton/>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
