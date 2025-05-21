<script setup>
// import useAuth from "@/stores/auth.pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

// const auth = useAuth();
const router = useRouter();

onMounted(() => {
  const tg = window.Telegram.WebApp;
  const initData = tg.initData;
  // const initData =
  //   "query_id=AAEF26U9AgAAAAXbpT2swhZg&user=%7B%22id%22%3A5329246981%2C%22first_name%22%3A%22Nodirbek%22%2C%22last_name%22%3A%22Najmiddinov%22%2C%22username%22%3A%22Rare_Oligarch%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FGTjzweWw22rKKoIgBxPWYzXbv9dkO9ufpeBr_2IyPoHmmeFc6dQLS9ixvnOKCJyb.svg%22%7D&auth_date=1747149701&signature=t1Yh5UFygnpjlFC53bqDFOjIlS-FGVrLI6ehqw1JnxgShycn-QgNIGW1rxCLrqNHJDt16QA3v-L5Kyidp9nsBw&hash=c01ce21274785ab88f4a6d38dae277c45e865c67a716ec80d030168620195172";
  console.log(initData);
  // auth.postLogin({ initData }, () => {
  //   router.push({ name: "Dashboard" });
  // });
});
</script>
<template>
  <div
    class="min-h-dvh overflow-y-hidden w-full flex items-center justify-center"
  >
    <a-spin :spinning="true" size="large"></a-spin>
  </div>
</template>
