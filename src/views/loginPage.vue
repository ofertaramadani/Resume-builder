<template>
    <div class="login">
      <div class="login__wrapper container">
        <div class="login__title"><h2>Login</h2></div>
        <form @submit.prevent="handleSubmit">
          <div class="login__credentials">
            <div class="login__credentials-email">
              <inputElement :input-value="userEmail" @update:input-value="userEmail = $event" :input-type="'text'" :input-placeholder="'Email'" />
              <div v-if="shouldShowEmailError()" class="error-message">{{ emailError() }}</div>
            </div>
            <div class="login__credentials-password">
              <inputElement :input-value="userPassword" @update:input-value="userPassword = $event" :input-type="'password'" :input-placeholder="'Password'" />
              <div v-if="shouldShowPasswordError()" class="error-message">{{ passwordError() }}</div>
            </div>
          </div>
          <div class="login__submit">
            <buttonElement class="btn__authentication">Submit</buttonElement>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import inputElement from '../components/input/inputElement.vue';
  import buttonElement from '../components/button/buttonElement.vue';
  
  const userEmail = ref('');
  const userPassword = ref('');
  
  const formSubmitted = ref(false);
  
  const emailError = () => {
    if (formSubmitted.value && !userEmail.value) {
      return 'Email is required';
    } else if (formSubmitted.value && !isValidEmail(userEmail.value)) {
      return 'Invalid email format';
    }
    return null;
  };
  
  const passwordError = () => {
    if (formSubmitted.value && !userPassword.value) {
      return 'Password is required';
    }
    return null;
  };
  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const shouldShowEmailError = () => formSubmitted.value && !!emailError();
  const shouldShowPasswordError = () => formSubmitted.value && !!passwordError();
  
  const handleSubmit = () => {
    formSubmitted.value = true;
    if (!emailError() && !passwordError()) {
      // Your logic for handling a valid form submission
      console.log('Form submitted successfully');
    } else {
      // Your logic for handling an invalid form submission
      console.log('Form submission failed. Please check errors.');
    }
  };
  </script>
  
  <style lang="scss" scoped>
  @import '../assets/scss/index.scss';
  @import '../assets/scss/pages/loginPage';
  .error-message {
    color: red;
    margin-top: 5px;
  }
  </style>
  