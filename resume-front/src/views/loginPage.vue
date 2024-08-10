<template>
  <div class="login">
    <div class="login__wrapper container">
      <div class="login__title"><h2>Login</h2></div>
      <form @submit.prevent="handleSubmit">
        <div class="login__credentials">
          <div class="login__credentials-email">
            <inputElement
              :input-value="userEmail"
              @update:input-value="userEmail = $event"
              :input-type="'text'"
              :input-placeholder="'Email'"
            />
            <div v-if="emailError" class="error-message">
              {{ emailError }}
            </div>
          </div>
          <div class="login__credentials-password">
            <inputElement
              :input-value="userPassword"
              @update:input-value="userPassword = $event"
              :input-type="'password'"
              :input-placeholder="'Password'"
            />
            <div v-if="passwordError" class="error-message">
              {{ passwordError }}
            </div>
          </div>
        </div>
        <div class="error-message" v-if="generalError">{{ generalError }}</div>
        <div class="login__submit">
          <buttonElement class="btn__authentication">Submit</buttonElement>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import inputElement from "../components/input/inputElement.vue";
import buttonElement from "../components/button/buttonElement.vue";
import { auth } from "@/store/auth";

const router = inject("router");
const store = auth();

const userEmail = ref("");
const userPassword = ref("");
const formSubmitted = ref(false);

let generalError = ref("");

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const emailError = computed(() => {
  if (formSubmitted.value && !userEmail.value) {
    return "Email is required";
  } else if (formSubmitted.value && !isValidEmail(userEmail.value)) {
    return "Invalid email format";
  }
  return null;
});

const passwordError = computed(() => {
  if (formSubmitted.value && !userPassword.value) {
    return "Password is required";
  }
  return null;
});

const handleSubmit = async () => {
  formSubmitted.value = true;
  if (!emailError.value && !passwordError.value) {
    try {
      await store.login({
        email: userEmail.value,
        password: userPassword.value,
      });
      router.push("/dashboard");
    } catch (e) {
      console.error("Login failed:", e);
      generalError.value = e.response.data.message;
    }
  } else {
    console.log("Form submission failed. Please check errors.");
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
@import "../assets/scss/pages/loginPage";
.error-message {
  color: red;
  margin-top: 5px;
}
</style>
