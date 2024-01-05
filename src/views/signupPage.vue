<template>
    <div class="signup">
      <div class="signup__wrapper container">
        <div class="signup__title"><h2>Sign Up</h2></div>
        <form @submit.prevent="handleSubmit">
          <div class="signup__credentials">
            <div class="signup__credentials-name">
              <inputElement :input-value="userName" @update:input-value="userName = $event" :input-type="'text'" :input-placeholder="'Name'" />
              <div v-if="shouldShowNameError()" class="error-message">{{ nameError() }}</div>
            </div>
            <div class="signup__credentials-surname">
              <inputElement :input-value="userSurname" @update:input-value="userSurname = $event" :input-type="'text'" :input-placeholder="'Surname'" />
              <div v-if="shouldShowSurnameError()" class="error-message">{{ surnameError() }}</div>
            </div>
            <div class="signup__credentials-email">
              <inputElement :input-value="userEmail" @update:input-value="userEmail = $event" :input-type="'text'" :input-placeholder="'Email'" />
              <div v-if="shouldShowEmailError()" class="error-message">{{ emailError() }}</div>
            </div>
            <div class="signup__credentials-password">
              <inputElement :input-value="userPassword" @update:input-value="userPassword = $event" :input-type="'password'" :input-placeholder="'Password'" />
              <div v-if="shouldShowPasswordError()" class="error-message">{{ passwordError() }}</div>
            </div>
            <div class="signup__credentials-confirm-password">
              <inputElement :input-value="confirmPassword" @update:input-value="confirmPassword = $event" :input-type="'password'" :input-placeholder="'Confirm Password'" />
              <div v-if="shouldShowConfirmPasswordError()" class="error-message">{{ confirmPasswordError() }}</div>
            </div>
          </div>
          <div class="signup__submit">
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
  
  const userName = ref('');
  const userSurname = ref('');
  const userEmail = ref('');
  const userPassword = ref('');
  const confirmPassword = ref('');
  
  const formSubmitted = ref(false);
  
  const nameError = () => {
    if (formSubmitted.value && !userName.value) {
      return 'Name is required';
    }
    return null;
  };
  
  const surnameError = () => {
    if (formSubmitted.value && !userSurname.value) {
      return 'Surname is required';
    }
    return null;
  };
  
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
  
  const confirmPasswordError = () => {
    if (formSubmitted.value && confirmPassword.value !== userPassword.value) {
      return 'Passwords do not match';
    }
    return null;
  };
  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const shouldShowNameError = () => formSubmitted.value && !!nameError();
  const shouldShowSurnameError = () => formSubmitted.value && !!surnameError();
  const shouldShowEmailError = () => formSubmitted.value && !!emailError();
  const shouldShowPasswordError = () => formSubmitted.value && !!passwordError();
  const shouldShowConfirmPasswordError = () => formSubmitted.value && !!confirmPasswordError();
  
  const handleSubmit = () => {
    formSubmitted.value = true;
    if (
      !nameError() &&
      !surnameError() &&
      !emailError() &&
      !passwordError() &&
      !confirmPasswordError()
    ) {
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
  @import '../assets/scss/pages/signupPage.scss';
  </style>
  