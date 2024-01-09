<template>
    <div class="employment">
      <div class="employment__input employment__title">
        <div class="employment__wrap">
            <p class="employment__input-title">Job Title</p>
            <input type="text" :value="employmentTitle" />
        </div>
      </div>
      <div class="employment__input">
        <div class="employment__wrap">
            <p class="employment__input-title">Employer</p>
            <input type="text" :value="employmentSchool"  />
        </div>
      </div>
      <div class="employment__input">
        <p class="employment__input-title">Place</p>
        <input type="text" :value="employmentPlace" />
      </div>
      <div class="employment__input">
        <p class="employment__input-title">Start</p>
        <input type="date" :value="employmentStart"  />
      </div>
      <div class="employment__input">
        <p class="employment__input-title">End</p>
        <input type="date" :value="employmentEnd"  />
      </div>
      <div class="employment__input employment__description">
        <p class="employment__input-title">Description</p>
        <textarea :value="employmentDescription" ></textarea>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  defineProps({employmentTitle:String, employmentSchool:String, employmentPlace:String, employmentStart:String, employmentEnd:String, employmentDescription:String});

  

</script>
<style lang="scss" scoped>
@import './employmentHistory.scss';
</style>