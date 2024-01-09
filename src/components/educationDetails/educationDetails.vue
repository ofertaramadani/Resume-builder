<template>
    <div class="education">
      <div class="education__input education__title">
        <p class="education__input-title">Title</p>
        <input type="text" :value="educationTitle" />
      </div>
      <div class="education__input">
        <p class="education__input-title">School</p>
        <input type="text" :value="educationSchool"  />
      </div>
      <div class="education__input">
        <p class="education__input-title">Place</p>
        <input type="text" :value="educationPlace" />
      </div>
      <div class="education__input">
        <p class="education__input-title">Start</p>
        <input type="date" :value="educationStart"  />
      </div>
      <div class="education__input">
        <p class="education__input-title">End</p>
        <input type="date" :value="educationEnd"  />
      </div>
      <div class="education__input education__description">
        <p class="education__input-title">Description</p>
        <textarea :value="educationDescription" ></textarea>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  defineProps({educationTitle:String, educationSchool:String, educationPlace:String, educationStart:String, educationEnd:String, educationDescription:String});

  

</script>
<style lang="scss" scoped>
@import './educationDetails.scss';
</style>