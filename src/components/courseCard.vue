<script setup>
import { useRouter } from "vue-router";
import useCourse from "@/stores/course.pinia";
import { ref } from "vue";
import close from "./Icons/close.vue";

const router = useRouter();
const course = useCourse();
const open = ref(false);

const showDrawer = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
};

function join(id) {
  course.postCourse({ course: id }, () => {});
}
function joinPremium(id) {
  course.postPremium({ course_id: id }, (url) => {
    localStorage.setItem("premium", id);
    window.open(url);
  });
}
function goCourse(id = 0) {
  router.push({ name: "Course", params: { id } });
}
defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      image: "",
      name: "",
      description: "",
      short_description: "",
      progress: 0,
      is_joined: false,
    }),
  },
});
</script>

<template>
  <div class="bg-dark-310 p-2.5 cursor-pointer rounded-xl flex gap-2">
    <img class="w-26 h-26 object-cover rounded-lg" :src="data.image" />

    <div class="flex h-full flex-col justify-between flex-1">
      <div class="flex flex-col gap-1.5 text-sm">
        <h3 class="font-medium">{{ data.name }}</h3>
        <p class="text-xs opacity-70">{{ data.short_description }}</p>
      </div>

      <div
        class="grid-cols-3 items-center text-min mt-2"
        :class="
          !data.is_joined ? 'flex justify-between w-full gap-2.5' : 'grid gap-1'
        "
      >
        <template v-if="data?.is_joined">
          <button
            @click="goCourse(data?.id)"
            class="p-1.5 h-full w-full flex items-center justify-center rounded-2xl uppercase text-white bg-blue-500"
          >
            Открыть
          </button>

          <div
            class="rounded-2xl bg-dark-310 relative h-full p-0 flex bg-transparent border border-blue-500"
          >
            <span
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >{{ data.progress }}%</span
            >
            <div
              class="bg-blue-500 rounded-l-2xl h-full"
              :class="data.progress == 100 && 'rounded-r-2xl'"
              :style="{ width: data.progress + '%' }"
            ></div>
          </div>
        </template>
        <template v-else>
          <button
            v-if="!data.price"
            @click="join(data.id)"
            class="py-1.5 px-2 h-full min-w-max flex-grow flex items-center justify-center rounded-2xl uppercase text-white bg-blue-500"
          >
            ЗАБРАТЬ БЕСПЛАТНО
          </button>
          <button
            v-else
            @click="joinPremium(data.id)"
            class="py-1.5 px-2 h-full min-w-max flex-grow flex items-center justify-center rounded-2xl uppercase text-white bg-blue-500"
          >
            ОПЛАТИТЬ — {{ data.price }} ₽
          </button>
        </template>
        <button
          @click="showDrawer"
          class="p-1.5 h-full flex items-center justify-center rounded-2xl uppercase text-white bg-dark-420"
        >
          Подробнее
        </button>
      </div>
    </div>
    <a-drawer
      placement="bottom"
      :closable="false"
      :open="open"
      @close="onClose"
    >
      <div class="">
        <h3 class="font-semibold text-xl">{{ data.name }}</h3>
        <span
          class="opacity-70 text-2xl absolute -top-6 right-1.5 p-1 rounded-full bg-dark-120"
          @click="onClose"
        >
          <close />
        </span>
        <div v-html="data?.description"></div>
      </div>
    </a-drawer>
  </div>
</template>
