import { createRouter, createWebHistory } from "vue-router";
import landingPage from "../views/landingPage";
import loginPage from "../views/loginPage";
import signupPage from "../views/signupPage";
import dashboardPage from "../views/dashboardPage";
import createResumePage from "../views/createResumePage";

const routes = [
  {
    path: "/",
    name: "landingPage",
    component: landingPage,
  },
  {
    path: "/login",
    name: "loginPage",
    component: loginPage,
  },
  {
    path: "/signup",
    name: "signupPage",
    component: signupPage,
  },
  {
    path: "/dashboard",
    name: "dashboardPage",
    component: dashboardPage,
  },
  {
    path: "/resume/:resumeId",
    name: "createResumePage",
    component: createResumePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("accessToken");
  window.scrollTo(0, 0);
  if (
    token &&
    token !== "" &&
    token !== undefined &&
    (to.name === "loginPage" || to.name === "signupPage")
  ) {
    next(from);
  } else {
    next();
  }
});

export default router;
