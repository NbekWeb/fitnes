import { createRouter, createWebHistory } from "vue-router";
import Main from "@/layouts/Main.vue";
import Dashboard from "@/pages/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Main,
      name: "Main",
      children: [
        {
          path: "",
          component: Dashboard,
          name: "Dashboard",
        },
      ],
    },
    {
      path: "/course/:id",
      name: "Course",
      component: () => import("@/pages/SingleCourse.vue"),
    },
    {
      path: "/lesson/:id",
      name: "Lesson",
      component: () => import("@/pages/Lesson.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/Login.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("access_token");

  // document.title = to.meta.title || "Авторизоваться";

  if (to.name === "login") {
    return next();
  }

  if (accessToken) {
    return next();
  } else {
    return next({
      name: "login",
    });
  }
});

export default router;
