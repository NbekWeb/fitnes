<script setup>
import chevron from "./Icons/chevron.vue";
defineProps({
  data: {
    type: Object,
    default: () => ({
      label: "",
      icon: null,
      link: "",
    }),
  },
  border: {
    type: Boolean,
    default: false,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["action"]);
function goAction() {
  emit("action");
}
</script>
<template>
  <div
    @click="goAction"
    class="bg-black border-dark-270 p-2 rounded-lg flex justify-between items-center hover:cursor-pointer"
    :class="[border && 'border-t-2']"
  >
    <div class="flex items-center gap-2.5">
      <div class="p-1 text-white/60 bg-dark-270 rounded text-2xl">
        <component :is="data.icon" />
      </div>
      <span class="text-sm">
        {{ data.label }}
      </span>
    </div>
    <chevron
      class="opacity-50 text-2xl transition duration-300"
      :class="show && 'rotate-90'"
    />
  </div>
</template>
