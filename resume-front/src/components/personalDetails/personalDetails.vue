<!-- YourComponent.vue -->
<template>
  <div class="personal-details">
    <div class="personal-details__input">
      <p class="personal-details__input-title required">Title</p>
      <input
        type="text"
        v-model="resumePersonalDetails.title"
        @input="updateUserTitle"
      />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title">Photo</p>
      <div class="personal-details__photo">
        sdfdsf {{ resumePersonalDetails.photo }}
        <input
          type="file"
          accept="image/jpeg/png"
          @change="handleFileChange"
          v-if="!resumePersonalDetails.photo"
        />
        <div class="personal-details__remove-img" v-else>
          <img
            :src="`http://localhost:3000${resumePersonalDetails.photo}`"
            alt="User Photo"
            class="user-img"
          />
          <p @click="removeProfileImg()">Remove</p>
        </div>
      </div>
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title required">First Name</p>
      <input type="text" v-model="resumePersonalDetails.firstname" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title required">Last Name</p>
      <input type="text" v-model="resumePersonalDetails.lastname" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title required">Email</p>
      <input type="text" v-model="resumePersonalDetails.email" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title required">Phone</p>
      <input type="number" v-model="resumePersonalDetails.phone" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title required">Country</p>
      <input type="text" v-model="resumePersonalDetails.country" />
    </div>
    <div class="personal-details__input">
      <p class="personal-details__input-title required">City</p>
      <input type="text" v-model="resumePersonalDetails.city" />
    </div>
  </div>
</template>

<script setup>
import { usePersonalDetailsStore } from "@/store/personalDetailsStore";
import { useResumeStore } from "@/store/cvStore";
import { onBeforeMount, reactive } from "vue";
const personalDetailsStore = usePersonalDetailsStore();
const resumeStore = useResumeStore();
var resumePersonalDetails = reactive({});
onBeforeMount(() => {
  resumePersonalDetails = resumeStore.currentResume;
});
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await resumeStore.uploadImage(file);
  }
};
const removeProfileImg = async () => {
  await resumeStore.removeImage();
};
</script>

<style lang="scss" scoped>
@import "./personalDetails.scss";
</style>
