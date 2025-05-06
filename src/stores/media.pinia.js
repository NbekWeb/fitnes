import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useMedia = defineStore("media", {
  state: () => ({
    medias: [],
    politics:[]
  }),
  actions: {
    getMedia() {
      const core = useCore();
      core.loadingUrl.add("media/platforms/");
      api({
        url: "media/platforms/",
        method: "GET",
      })
        .then(({ data }) => {
          this.medias = data;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("media/platforms/");
        });
    },
    getPolitics() {
      const core = useCore();
      core.loadingUrl.add("contrack/politics/");
      api({
        url: "contrack/politics/",
        method: "GET",
      })
        .then(({ data }) => {
          this.politics = data;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("contrack/politics/");
        });
    },
    postSupport(data, callback) {
      const core = useCore();
      core.loadingUrl.add("technical/support/");
      api({
        url: "technical/support/",
        method: "POST",
        data,
      })
        .then(() => {
          message.success("Сообщение отправлено!");
          callback();
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("technical/support/");
        });
    },
  },
});

export default useMedia;
