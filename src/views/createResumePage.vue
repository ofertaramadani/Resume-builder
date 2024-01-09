<template>
    <div class="create-resume">
        <div class="create-resume__fields">
            <div class="create-resume__back"><img src="../assets/icons/back.svg" />Go back</div>
           <div class="create-resume__field">
              <div class="create-resume__field-name" @click="openTab('personal')" :class="{'create-resume__active': openTabs['personal']}">
                <h2>Personal Details</h2>
                <img :src="openTabs['personal'] ? require('../assets/icons/black-minus.svg') : require('../assets/icons/plus.svg')"/>
              </div>
                <personalDetails 
                :userTitle="userTitle" 
                v-if="openTabs['personal']"
                />
            </div>
            <div class="break"></div>
                <div class="create-resume__field">
                  <div class="create-resume__field-name" @click="openTab('summary')" :class="{'create-resume__active' : openTabs['summary']}">
                    <h2>Professional summary</h2>
                    <img :src="openTabs['summary'] ? require('../assets/icons/black-minus.svg') : require('../assets/icons/plus.svg')"/>
                  </div>
                    <textarea placeholder="Add your professional summary here"  v-if="openTabs['summary']" class="create-resume__professional-text"></textarea>
                </div>
            <div class="break"></div>
                <div class="create-resume__field">
              <div class="create-resume__field-name"  @click="openTab('education')" :class="{'create-resume__active': openTabs['education']}">
                <h2>Education</h2>
                <img :src="openTabs['education'] ? require('../assets/icons/black-minus.svg') : require('../assets/icons/plus.svg')"/>
              </div>
                <educationDetails  v-if="openTabs['education']"/>
            </div>
            <div class="break"></div>
                <div class="create-resume__field">
              <div class="create-resume__field-name"  @click="openTab('employment')" :class="{'create-resume__active': openTabs['employment']}">
                <h2>Employment History</h2>
                <img :src="openTabs['employment'] ? require('../assets/icons/black-minus.svg') : require('../assets/icons/plus.svg')"/>
              </div>
                <employmentHistory  v-if="openTabs['employment']"/>
            </div>
            <div class="break"></div>
                <div class="create-resume__field">
                <div class="create-resume__field-name" @click="openTab('skills')" :class="{'create-resume__active': openTabs['skills']}">
                <h2>Skills</h2>
                <img :src="openTabs['skills'] ? require('../assets/icons/black-minus.svg') : require('../assets/icons/plus.svg')"/>
              </div>
                <skillsDetails  v-if="openTabs['skills']" />
            </div>
        </div>
        <div class="create-resume__template"></div>
    </div>
</template>

<script setup>
import personalDetails from '../components/personalDetails/personalDetails.vue';
import educationDetails from '../components/educationDetails/educationDetails.vue';
import employmentHistory from '../components/employmentHistory/employmentHistory.vue';
import skillsDetails from '../components/skillsDetails/skillsDetails.vue';

import { reactive } from 'vue';

const openTabs = reactive({
    personal: true,
    summary: false,
    education: false,
    employment: false,
    skills: false
});

function openTab(tabName) {
    console.log(openTabs[tabName])
    openTabs[tabName] = !openTabs[tabName]
}

</script>
<style lang="scss" scoped>
@import '../assets/scss/index.scss';
@import '../assets/scss/pages/createResumePage.scss';
</style>