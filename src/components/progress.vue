<script setup>
defineProps({
  progress: {
    type: Number,
    default: 0,
  },
});
</script>
<template>
  <div
    class="rounded-xl bg-dark-310 relative h-4 p-0 flex bg-transparent border border-blue-500 text-min font-medium"
  >
    <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >{{progress }}%</span
    >
    <div
      class="bg-blue-500 rounded-l-xl h-full"
      :class="progress == 100 && 'rounded-r-xl'"
      :style="{ width: progress + '%' }"
    ></div>
  </div>
</template>
