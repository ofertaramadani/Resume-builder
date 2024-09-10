<template>
  <div>
    <div
      class="education__wrap"
      v-for="(education, index) in resumeStore.currentResume.educations"
      :key="index"
    >
      <div @click="openEdu(index)" class="education__tab">
        <p>{{ education.title }}, {{ education.school }}</p>
        <img
          :src="
            isOpen[index]
              ? require('../../assets/icons/up-arrow.svg')
              : require('../../assets/icons/down-arrow.svg')
          "
        />
      </div>
      <div class="education education__exist" v-show="isOpen[index]">
        <div class="education__input education__title">
          <p class="education__input-title">Title</p>
          <input type="text" v-model="education.title" />
        </div>
        <div class="education__input">
          <p class="education__input-title">School</p>
          <input type="text" v-model="education.school" />
        </div>
        <div class="education__input">
          <p class="education__input-title">Place</p>
          <input type="text" v-model="education.place" />
        </div>
        <div class="education__input">
          <p class="education__input-title">Start</p>
          <input type="date" v-model="education.start" />
        </div>
        <div class="education__input">
          <p class="education__input-title">End</p>
          <input type="date" v-model="education.end" />
        </div>
        <div class="education__input education__description">
          <p class="education__input-title">Description</p>
          <textarea v-model="education.description"></textarea>
        </div>
        <div class="education__remove" @click="removeEducation(education)">
          <img src="../../assets/icons/trash-icon.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="education">
      <div class="education__input education__title">
        <p class="education__input-title">Title</p>
        <input type="text" v-model="newEducation.title" />
      </div>
      <div class="education__input">
        <p class="education__input-title">School</p>
        <input type="text" v-model="newEducation.school" />
      </div>
      <div class="education__input">
        <p class="education__input-title">Place</p>
        <input type="text" v-model="newEducation.place" />
      </div>
      <div class="education__input">
        <p class="education__input-title">Start Date</p>
        <input type="date" v-model="newEducation.start" />
      </div>
      <div class="education__input">
        <p class="education__input-title">End Date</p>
        <input type="date" v-model="newEducation.end" />
      </div>
      <div class="education__input education__description">
        <p class="education__input-title">Description</p>
        <textarea type="text" v-model="newEducation.description"></textarea>
      </div>
    </div>
    <button @click="addNewEducation" class="education__btn">
      <p>Add +</p>
    </button>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useResumeStore } from "@/store/cvStore";
let resumeStore = useResumeStore();

let isOpen = ref([]);
let newEducation = reactive();

function removeEducation(education) {
  resumeStore.removeEducation(education);
}

function openEdu(index) {
  isOpen.value[index] = !isOpen.value[index];
}

const addNewEducation = () => {
  resumeStore.addEducation();
};
onBeforeMount(() => {
  newEducation = resumeStore.newEducation;
});
</script>
<style lang="scss" scoped>
@import "./educationDetails.scss";
</style>
