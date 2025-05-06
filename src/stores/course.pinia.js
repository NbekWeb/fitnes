import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useCourse = defineStore("course", {
  state: () => ({
    recomendations: [],
    courseDashoard: [],
    course: {},
    lesson: {},
    courses: [],
    courseAll: [],
  }),
  actions: {
    getRecomendation() {
      const core = useCore();
      core.loadingUrl.add("course/recomendation/");
      api({
        url: "course/recomendation/",
        method: "GET",
      })
        .then(({ data }) => {
          this.recomendations = data;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("course/recomendation/");
        });
    },
    getCourseAll() {
      const core = useCore();
      core.loadingUrl.add("course/all/");
      api({
        url: "course/all/",
        method: "GET",
      })
        .then(({ data }) => {
          this.courseAll = data?.results;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("course/all/");
        });
    },
    getCourseUser() {
      const core = useCore();
      core.loadingUrl.add("courseDashoard");
      api({
        url: "course/user/",
        method: "GET",
      })
        .then(({ data }) => {
          console.log(data.results);
          this.courseDashoard = data.results;
        })
        .catch((error) => {})
        .finally(() => {
          core.loadingUrl.delete("courseDashoard");
        });
    },

    getCourse(id) {
      const core = useCore();
      core.loadingUrl.add("course/detaile/");
      api({
        url: `course/${id}/detaile/`,
        method: "GET",
      })
        .then(({ data }) => {
          this.course = data;
        })
        .catch((error) => {
          const e = error?.response?.data;
          if (e?.detail) {
            message.error(e.detail);
          } else {
            message.error("Что-то пошло не так!");
          }
        })
        .finally(() => {
          core.loadingUrl.delete("course/detaile/");
        });
    },
    getLesson(id) {
        const core = useCore();
        core.loadingUrl.add("lesson/detaile/");
        api({
          url: `lesson/${id}/detaile/`,
          method: "GET",
        })
          .then(({ data }) => {
            this.lesson = data;
          })
          .catch((error) => {
            const e = error?.response?.data;
            if (e?.detail) {
              message.error(e.detail);
            } else {
              message.error("Что-то пошло не так!");
            }
          })
          .finally(() => {
            core.loadingUrl.delete("lesson/detaile/");
          });
      },
    
    postCourse(data, callback) {
      const core = useCore();
      core.loadingUrl.add("course/user/");
      api({
        url: "course/user/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          message.error("Что-то пошло не так!");
        })
        .finally(() => {
          core.loadingUrl.delete("course/user/");
        });
    },
  },
});

export default useCourse;
