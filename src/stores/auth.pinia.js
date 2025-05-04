import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import { message } from "ant-design-vue";

const useAuth = defineStore("auth", {
  actions: {
    postLogin(data, callback) {
      api({
        url: "fitnes/login/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access);
          callback();
        })
        .catch((error) => {
          console.log('da')
          message.error("Что-то пошло не так!");
        })
        .finally(() => {});
    },
  },
});

export default useAuth;
