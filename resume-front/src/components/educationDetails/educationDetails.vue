<template>
    <div>
      <div class="education__wrap" v-for="(education, index) in allEducations" :key="index">
        <div @click="openEdu(index)" class="education__tab">
          <p>{{ education.title }}, {{ education.school  }}</p>
          <img :src="isOpen[index] ? require('../../assets/icons/up-arrow.svg') : require('../../assets/icons/down-arrow.svg')">
        </div>
      <div class="education education__exist" v-show="isOpen[index]">
        <div class="education__input education__title">
          <p class="education__input-title">Title</p>
          <input type="text" :value="education.title" readonly />
        </div>
        <div class="education__input">
          <p class="education__input-title">School</p>
          <input type="text" :value="education.school" readonly />
        </div>
        <div class="education__input">
          <p class="education__input-title">Place</p>
          <input type="text" :value="education.place" readonly />
        </div>
        <div class="education__input">
          <p class="education__input-title">Start</p>
          <input type="date" :value="education.start" readonly  />
        </div>
        <div class="education__input">
          <p class="education__input-title">End</p>
          <input type="date" :value="education.end" readonly  />
        </div>
        <div class="education__input education__description">
          <p class="education__input-title">Description</p>
          <textarea :value="education.description" readonly ></textarea>
        </div>
        <div class="education__remove" @click="removeEducation(education.id,index)">
          <img src="../../assets/icons/trash-icon.svg" alt="">
        </div>
    </div>
  </div>
    <div class="education">
      <div class="education__input education__title">
      <p class="education__input-title">Title</p>
      <input type="text" @input="updateNewtitle($event)" :value="newEducation.title" />
    </div>
    <div class="education__input">
      <p class="education__input-title">School</p>
      <input type="text" @input="updateNewschool($event)" :value="newEducation.school" />
    </div>
    <div class="education__input">
      <p class="education__input-title">Place</p>
      <input type="text" @input="updateNewplace($event)" :value="newEducation.place" />
    </div>
    <div class="education__input">
      <p class="education__input-title">Start Date</p>
      <input type="date" @input="updateNewstart($event)" :value="newEducation.start" />
    </div>
    <div class="education__input">
      <p class="education__input-title">End Date</p>
      <input type="date" @input="updateNewend($event)" :value="newEducation.end"/>
    </div>
    <div class="education__input education__description">
      <p class="education__input-title">Description</p>
      <textarea type="text" @input="updateNewdescription($event)" :value="newEducation.description"></textarea>
    </div>
    </div>
    <button @click="addNewEducation" class="education__btn"><p>Add +</p></button>
  </div>
  </template>
  
  <script setup>
import {reactive, ref, watch } from 'vue';
import { useResumeStore } from '@/store/cvStore';
import { useEducationStore } from '@/store/educationStore';
let resumeStore = useResumeStore();
let educationsStore = useEducationStore();
let allEducations = ref([]);
let isOpen = ref([]);

watch(resumeStore.currentResume,async(newVal) => {
  console.log('im in1')
    if(resumeStore.addedEducations.length > 0){
        allEducations.value = newVal.educations.concat(resumeStore.addedEducations)
    }
    else {
        allEducations.value = newVal.educations
    }
}, { deep: true, immediate: true })

watch(resumeStore.addedEducations,async(newVal) => {
  console.log('im in')
    if(resumeStore.currentResume.educations.length > 0) {
        allEducations.value = newVal.concat(resumeStore.currentResume.educations)
    }
    else {
        allEducations.value = newVal
    }
}, { deep: true, immediate: true })

async function removeEducation(educationId) {
  // if(educationId !== undefined) {
    const cvId = resumeStore.currentResume.id
    await educationsStore.removeEducation(cvId, educationId)
  // }
  // console.log('BEFORE',resumeStore.currentResume.educations)
  // resumeStore.currentResume.educations.splice(index,1)
  // console.log('AFTER',resumeStore.currentResume.educations.splice(index,1))
}

function openEdu(index) {
  isOpen.value[index] = !isOpen.value[index];
}

const newEducation = reactive({
  title: '',
  school: '',
  place: '',
  start: '',
  end: '',
  description: ''
});

const updateNewtitle = (event) => {
  newEducation.title = event.target.value;
};

const updateNewschool = (event) => {
  newEducation.school = event.target.value;
};

const updateNewplace = (event) => {
  newEducation.place = event.target.value;
};

const updateNewstart = (event) => {
  newEducation.start = event.target.value;
};

const updateNewend = (event) => {
  newEducation.end = event.target.value;
};

const updateNewdescription = (event) => {
  newEducation.description = event.target.value;
};
const addNewEducation = () => {
  resumeStore.addEducation({ ...newEducation });
  newEducation.title = '';
  newEducation.school = '';
  newEducation.place = '';
  newEducation.start = '';
  newEducation.end = '';
  newEducation.description = '';
};

</script>
<style lang="scss" scoped>
@import './educationDetails.scss';
</style>