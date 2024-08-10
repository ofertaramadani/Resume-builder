<!-- YourComponent.vue -->
<template>
  <div class="personal-details">
    <div class="personal-details__input">
      <p class="personal-details__input-title">Title</p>
      <input type="text" v-model="resumePersonalDetails.title" @input="updateUserTitle" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">Photo</p>
      <div class="personal-details__photo">
        <input type="file" accept="image/jpeg/png"
        @change="handlePhotoUpload" />
        <img v-if="personalDetailsStore.userPhoto" :src="resumePersonalDetails.photo" alt="User Photo" />
      </div>
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">First Name</p>
      <input type="text" v-model="resumePersonalDetails.firstname"  />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">Last Name</p>
      <input type="text" v-model="resumePersonalDetails.lastname"  />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">Email</p>
      <input type="text" v-model="resumePersonalDetails.email"  />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">Phone</p>
      <input type="text" v-model="resumePersonalDetails.phone" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">Country</p>
      <input type="text" v-model="resumePersonalDetails.country" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">City</p>
      <input type="text" v-model="resumePersonalDetails.city"  />
    </div>
  </div>
</template>

<script setup>
import { usePersonalDetailsStore } from '@/store/personalDetailsStore';
import { useResumeStore } from '@/store/cvStore';
import { onBeforeMount, reactive } from 'vue';
const personalDetailsStore = usePersonalDetailsStore();
const resumeStore = useResumeStore();
var resumePersonalDetails = reactive({});
onBeforeMount(()=>{
  resumePersonalDetails = resumeStore.currentResume
})
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
