<!-- components/ProductCardSkeleton.vue -->
<script setup>
import { Skeleton } from "ant-design-vue";
</script>

<template>
  <div class="bg-dark-310 p-2.5 cursor-pointer rounded-xl flex gap-2">
    <!-- Skeleton Image -->
    <div class="w-26 h-26">
      <a-skeleton
        active
        :loading="true"
        :paragraph="false"
        :avatar="{
          shape: 'square',
          size: 104,
          style: { borderRadius: '8px' },
        }"
      />
    </div>

    <!-- Skeleton Text & Buttons -->
    <div class="flex h-full flex-col justify-between flex-1">
      <div class="flex flex-col gap-1.5 text-sm">
        <h3 class="font-medium mb-0">
          <a-skeleton :paragraph="false" :title="{ width: '80%' }" active />
        </h3>
        <p class="text-xs opacity-70">
          <a-skeleton
            :title="false"
            :paragraph="{ rows: 2, width: ['100%', '80%'] }"
            active
          />
        </p>
      </div>
    </div>
  </div>
</template>
