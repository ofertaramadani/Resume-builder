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
        <input
          type="file"
          accept="image/jpeg/png"
          @change="handleFileChange"
          v-if="!resumePersonalDetails.photo"
        />
        <div class="personal-details__remove-img" v-else>
          <img
            :src="`http://localhost:3000/uploads/${resumePersonalDetails.photo}`"
            alt="User Photo"
            class="user-img"
          />
          <div @click="removeProfileImg()" class="remove-img"></div>
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
const emit = defineEmits(["file-changed"]);

onBeforeMount(() => {
  resumePersonalDetails = resumeStore.currentResume;
});
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  emit("file-changed", file);
  if (file) {
    await resumeStore.addImageToCv(file);
  }
};
const removeProfileImg = async () => {
  await resumeStore.removeImage();
};
</script>

<style lang="scss" scoped>
@import "./personalDetails.scss";
.remove-img {
  position: relative;
  &:after {
    content: "";
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    right: -20px;
    background-image: url("data:image/svg+xml,%3Csvg fill='%23000000' width='20px' height='20px' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Ctitle%3Eremove%3C/title%3E%3Cpath d='M11.188 4.781c6.188 0 11.219 5.031 11.219 11.219s-5.031 11.188-11.219 11.188-11.188-5-11.188-11.188 5-11.219 11.188-11.219zM11.25 17.625l3.563 3.594c0.438 0.438 1.156 0.438 1.594 0 0.406-0.406 0.406-1.125 0-1.563l-3.563-3.594 3.563-3.594c0.406-0.438 0.406-1.156 0-1.563-0.438-0.438-1.156-0.438-1.594 0l-3.563 3.594-3.563-3.594c-0.438-0.438-1.156-0.438-1.594 0-0.406 0.406-0.406 1.125 0 1.563l3.563 3.594-3.563 3.594c-0.406 0.438-0.406 1.156 0 1.563 0.438 0.438 1.156 0.438 1.594 0z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
  }
}
</style>
