<template>
  <div>
    <div class="employment__wrap" v-for="(experience, index) in resumeStore.currentResume.experiences" :key="index">
      <div @click="openEdu(index)" class="employment__tab">
        <p>{{ experience.title }}, {{ experience.employer }}</p>
        <img :src="isOpen[index] ? require('../../assets/icons/up-arrow.svg') : require('../../assets/icons/down-arrow.svg')">
      </div>
    <div class="employment employment__exist" v-show="isOpen[index]">
      <div class="employment__input employment__title">
        <p class="employment__input-title">Title</p>
        <input type="text" v-model="experience.title" />
      </div>
      <div class="employment__input">
        <p class="employment__input-title">Employer</p>
        <input type="text" v-model="experience.employer" />
      </div>
      <div class="employment__input">
        <p class="employment__input-title">Place</p>
        <input type="text" v-model="experience.place" />
      </div>
      <div class="employment__input">
        <p class="employment__input-title">Start</p>
        <input type="date" v-model="experience.start"/>
      </div>
      <div class="employment__input">
        <p class="employment__input-title">End</p>
        <input type="date" v-model="experience.end"/>
      </div>
      <div class="employment__input employment__description">
        <p class="employment__input-title">Description</p>
        <textarea v-model="experience.description"></textarea>
      </div>
      <div class="employment__remove" @click="removeExperience(experience)">
          <img src="../../assets/icons/trash-icon.svg" alt="">
        </div>
  </div>
</div>
  <div class="employment">
    <div class="employment__input employment__title">
    <p class="employment__input-title">Title</p>
    <input type="text"  v-model="newExperience.title"/>
  </div>
  <div class="employment__input">
    <p class="employment__input-title">Employer</p>
    <input type="text"  v-model="newExperience.employer" />
  </div>
  <div class="employment__input">
    <p class="employment__input-title">Place</p>
    <input type="text" v-model="newExperience.place" />
  </div>
  <div class="employment__input">
    <p class="employment__input-title">Start Date</p>
    <input type="date" v-model="newExperience.start"/>
  </div>
  <div class="employment__input">
    <p class="employment__input-title">End Date</p>
    <input type="date" v-model="newExperience.end" />
  </div>
  <div class="employment__input employment__description">
    <p class="employment__input-title">Description</p>
    <textarea type="text" v-model="newExperience.description"></textarea>
  </div>
  </div>
  <button @click="addNewExperience" class="employment__btn"><p>Add +</p></button>
</div>
</template>

<script setup>
import { useResumeStore } from '@/store/cvStore';
import {  ref } from 'vue';

let isOpen = ref([]);

function openEdu(index) {
isOpen.value[index] = !isOpen.value[index];
}

function removeExperience(experience) {
  resumeStore.removeExperience(experience)
}

const resumeStore = useResumeStore();
const newExperience = {
title: '',
employer: '',
place: '',
start: '',
end: '',
description: ''
};

const addNewExperience = async () => {
resumeStore.addExperience({ ...newExperience });
newExperience.title = '';
newExperience.employer = '';
newExperience.place = '';
newExperience.start = '';
newExperience.end = '';
newExperience.description = '';
};


</script>
<style lang="scss" scoped>
@import './employmentHistory.scss';
</style>