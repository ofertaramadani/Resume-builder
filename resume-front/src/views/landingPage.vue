<template>
  <div class="wrapper">
    <div class="home container">
      <section class="home__hero">
        <div class="home__hero-info">
          <h1>Create your own portofolio</h1>
          <p>
            Our perfect resume builder takes things on another level. Choose a
            template and start giving your informations to fill the fields.
          </p>
          <div class="home__hero-btn">
            <buttonElement @click="goTo">{{
              store.isLoggedIn ? "Go to dashboard" : "Choose a template"
            }}</buttonElement>
          </div>
        </div>
        <div class="home__hero-img">
          <img src="../assets/images/banner2.png" alt="" />
        </div>
      </section>
    </div>
  </div>
  <section class="qualities__wrapper">
    <div class="container">
      <div class="qualities">
        <div class="qualities__left">
          <img src="@/assets/images/template_5.png" alt="" />
          <img
            class="img-absolute"
            src="@/assets/images/template_1.png"
            alt=""
          />
        </div>
        <div class="qualities__right">
          <h2>Why you should choose us</h2>
          <h5>Free of charge</h5>
          <h5>Creative Templates Design</h5>
          <h5>User friendly and Intuitive Online Resume Builder</h5>
          <h5>CV Templates to increase Hiring Chance</h5>
        </div>
      </div>
    </div>
  </section>
  <section><appFooter /></section>
</template>
<script setup>
import { inject } from "vue";
import buttonElement from "../components/button/buttonElement.vue";
import appFooter from "@/components/appFooter.vue";
import { auth } from "@/store/auth";

const router = inject("router");
const store = auth();
function goTo() {
  if (store.isLoggedIn) {
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
@import "../assets/scss/pages/landingPage.scss";
</style>
