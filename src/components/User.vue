<script setup>
import useAuth from "@/stores/auth.pinia";
import { storeToRefs } from "pinia";

const auth = useAuth();
const {user} = storeToRefs(auth);
</script>

<template>
  <div class="flex items-center gap-2 py-2 text-white text-lg font-semibold">
    <img
      :src="user?.avatar_url"
      class="w-10 h-10 rounded-full object-cover"
    />
    <span>{{ user?.first_name }}</span>
  </div>
</template>
