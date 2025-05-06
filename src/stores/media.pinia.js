import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useMedia = defineStore("media", {
  state: () => ({
    medias:[]
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
  },
});

export default useMedia;
