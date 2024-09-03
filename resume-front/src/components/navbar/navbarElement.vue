<template>
  <div class="header">
    <div class="container">
      <div class="header__wrapper">
        <router-link to="/" class="routerLink"
          ><h4 class="header__logo">resumeBox.</h4></router-link
        >
        <div class="header__links">
          <nav class="header__nav" v-if="!isLogged">
            <router-link to="/login" class="routerLink"
              ><a href="" class="home__login">login</a></router-link
            >
            <router-link to="/signup" class="routerLink"
              ><a href="" class="home__signup">sign up</a></router-link
            >
          </nav>
          <nav class="header__nav" v-if="isLogged">
            <a href="" class="home__login" @click="logout">log out</a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, inject } from "vue";
import { auth } from "@/store/auth";

const router = inject("router");
const store = auth();
const isLogged = ref(false);
watch(
  localStorage.getItem("accessToken"),
  async () => {
    const token = localStorage.getItem("accessToken");
    if (token && token !== "" && token !== undefined) {
      isLogged.value = true;
    }
  },
  { immediate: true }
);

const logout = () => {
  store.logout();
  router.push("/login");
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/index.scss";
@import "./navbar";
</style>
