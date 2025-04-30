<script setup>
import User from "@/components/User.vue";
import down from "@/components/Icons/down.vue";
import { ref } from "vue";

const less = ref(false);
function giveLess() {
  less.value = !less.value;
}
</script>
<template>
  <div class="px-2.5 ">
    <User  class=""/>
    <div class="">
      <div
        class="flex gap-1 font-semibold items-center text-sm hover:cursor-pointer opacity-90 hover:opacity-100 transition-all duration-300 pb-1.5"
        @click="giveLess"
      >
        Рекомендуем
        <down
          class="text-xl transition-transform duration-500 ease-in-out"
          :class="less && '-rotate-180 '"
        />
      </div>
      <div class="py-3" :class="less && 'hidden'">
        <img src="@/assets/img/k2.png" class="h-26 rounded-lg"/>
      </div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores rem id
      sunt laboriosam eos labore culpa quas hic, velit dolorem commodi ut quasi
      ad nihil odit repellendus fugit deserunt recusandae?
    </div>
  </div>
</template>
<style scoped></style>
