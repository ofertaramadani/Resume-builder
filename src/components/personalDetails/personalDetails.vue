<!-- YourComponent.vue -->
<template>
  <div class="personal-details">
    <div class="personal-details__input">
      <p class="personal-details__input-title">Title</p>
      <input type="text" :value="personalDetailsStore.userTitle" @input="updateUserTitle" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">Photo</p>
      <div class="personal-details__photo">
        <input type="file" accept="image/jpeg/png
        
        " @change="handlePhotoUpload" />
        <img v-if="personalDetailsStore.userPhoto" :src="personalDetailsStore.userPhoto" alt="User Photo" />
      </div>
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">First Name</p>
      <input type="text" :value="personalDetailsStore.userFirstname" @input="updateUserFirstname" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">Last Name</p>
      <input type="text" :value="personalDetailsStore.userLastname" @input="updateUserLastname" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">Email</p>
      <input type="text" :value="personalDetailsStore.userEmail" @input="updateUserEmail" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">Phone</p>
      <input type="text" :value="personalDetailsStore.userPhone" @input="updateUserPhone" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">Country</p>
      <input type="text" :value="personalDetailsStore.userCountry" @input="updateUserCountry" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">City</p>
      <input type="text" :value="personalDetailsStore.userCity" @input="updateUserCity" />
    </div>
    <!-- ... add other personal details fields -->
  </div>
</template>

<script setup>
import { usePersonalDetailsStore } from '@/store/personalDetailsStore';

const personalDetailsStore = usePersonalDetailsStore();

const updateUserTitle = (event) => {
  personalDetailsStore.setUserTitle(event.target.value);
};

const updateUserFirstname = (event) => {
  personalDetailsStore.setUserFirstname(event.target.value);
};

const updateUserLastname = (event) => {
  personalDetailsStore.setUserLastname(event.target.value);
};

const updateUserEmail = (event) => {
  personalDetailsStore.setUserEmail(event.target.value);
};

const updateUserPhone = (event) => {
  personalDetailsStore.setUserPhone(event.target.value);
};

const updateUserCountry = (event) => {
  personalDetailsStore.setUserCountry(event.target.value);
};

const updateUserCity = (event) => {
  personalDetailsStore.setUserCity(event.target.value);
};

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      personalDetailsStore.setUserPhoto(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style lang="scss" scoped>
@import './personalDetails.scss';
</style>
