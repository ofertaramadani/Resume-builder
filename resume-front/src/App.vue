<template>
  <navbarElement
    v-if="
      $route.path === '/' ||
      $route.path === '/login' ||
      $route.path === '/signup'
    "
  />
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import navbarElement from "./components/navbar/navbarElement.vue";
import { auth } from "@/store/auth";
const store = auth();

onMounted(() => {
  if (localStorage.getItem("accessToken")) {
    console.log("yes");
    store.setLoginStatus(true);
    //do this;
  } else {
    console.log("no");
    store.setLoginStatus(false);
  }
});
</script>

<style lang="scss">
@import "./assets/scss/index.scss";
.container {
  margin: 0 auto;
  max-width: $container;
  width: 100%;
}
.routerLink {
  text-decoration: none;
}
textarea,
input {
  border: 1px solid #eff2f9 !important;
  border-radius: 5px;
}
textarea:focus,
input:focus {
  outline: none;
  border: 1px solid #263fa1 !important;
}
</style>
