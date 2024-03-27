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
        <input type="text" :value="experience.title" readonly />
      </div>
      <div class="employment__input">
        <p class="employment__input-title">Employer</p>
        <input type="text" :value="experience.employer" readonly />
      </div>
      <div class="employment__input">
        <p class="employment__input-title">Place</p>
        <input type="text" :value="experience.place" readonly />
      </div>
      <div class="employment__input">
        <p class="employment__input-title">Start</p>
        <input type="date" :value="experience.start" readonly  />
      </div>
      <div class="employment__input">
        <p class="employment__input-title">End</p>
        <input type="date" :value="experience.end" readonly  />
      </div>
      <div class="employment__input employment__description">
        <p class="employment__input-title">Description</p>
        <textarea :value="experience.description" readonly ></textarea>
      </div>
      <div class="employment__remove" @click="removeExperience(experience)">
          <img src="../../assets/icons/trash-icon.svg" alt="">
        </div>
  </div>
</div>
  <div class="employment">
    <div class="employment__input employment__title">
    <p class="employment__input-title">Title</p>
    <input type="text" @input="updateNewtitle($event)" />
  </div>
  <div class="employment__input">
    <p class="employment__input-title">Employer</p>
    <input type="text" @input="updateNewemployer($event)" />
  </div>
  <div class="employment__input">
    <p class="employment__input-title">Place</p>
    <input type="text" @input="updateNewplace($event)" />
  </div>
  <div class="employment__input">
    <p class="employment__input-title">Start Date</p>
    <input type="date" @input="updateNewstart($event)" />
  </div>
  <div class="employment__input">
    <p class="employment__input-title">End Date</p>
    <input type="date" @input="updateNewend($event)" />
  </div>
  <div class="employment__input employment__description">
    <p class="employment__input-title">Description</p>
    <textarea type="text" @input="updateNewdescription($event)"></textarea>
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

const updateNewtitle = (event) => {
newExperience.title = event.target.value;
};

const updateNewemployer = (event) => {
newExperience.employer = event.target.value;
};

const updateNewplace = (event) => {
newExperience.place = event.target.value;
};

const updateNewstart = (event) => {
newExperience.start = event.target.value;
};

const updateNewend = (event) => {
newExperience.end = event.target.value;
};

const updateNewdescription = (event) => {
newExperience.description = event.target.value;
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