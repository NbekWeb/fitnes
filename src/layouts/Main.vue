<script setup>
import Navbar from "@/components/Navbar.vue";
import useCore from "@/stores/core.pinia";
import { storeToRefs } from "pinia";
const core = useCore();
const { loadingUrl } = storeToRefs(core);
</script>
<template>
  <a-spin :spinning="loadingUrl.has('user')">
    <div class="relative">
      <div class="pb-18.5">
        <router-view />
      </div>
      <navbar />
    </div>
  </a-spin>
</template>
