<template>
    <div class="personal-details">
      <div class="personal-details__input">
        <p class="personal-details__input-title">Title</p>
        <input type="text" :value="userTitle" />
      </div>
      <div class="personal-details__input">
        <p class="personal-details__input-title">Photo</p>
        <div class="personal-details__photo">
          <input type="file" @change="handlePhotoUpload"  />
          <img v-if="userPhoto" :src="userPhoto" alt="User Photo"/>
        </div>
      </div>
      <div class="personal-details__input">
        <p class="personal-details__input-title">First Name</p>
        <input type="text" :value="userFirstname" />
      </div>
      <div class="personal-details__input">
        <p class="personal-details__input-title">Last Name</p>
        <input type="text" :value="userLastname"  />
      </div>
      <div class="personal-details__input">
        <p class="personal-details__input-title">Email</p>
        <input type="text" :value="userEmail"  />
      </div>
      <div class="personal-details__input">
        <p class="personal-details__input-title">Phone</p>
        <input type="text" :value="userPhone"  />
      </div>
      <div class="personal-details__input">
        <p class="personal-details__input-title">Country</p>
        <input type="text" :value="userCountry"  />
      </div>
      <div class="personal-details__input">
        <p class="personal-details__input-title">City</p>
        <input type="text" :value="userCity" />
      </div>
      <!-- ... add other personal details fields -->
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';
  defineProps({userTitle:String, userPhoto:String, userFirstname:String, userLastname:String, userEmail:String, userPhone:String, userCountry: String, userCity:String });
  const userPhoto = ref();

  const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userPhoto.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
  

</script>
<style lang="scss" scoped>
@import './personalDetails.scss';
</style>