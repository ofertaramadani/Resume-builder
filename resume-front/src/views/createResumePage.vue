<template>
    <div class="create-resume" v-if="templateLoaded">
        <div class="create-resume__fields">
            <div class="create-resume__back" @click="goBack()"><img src="../assets/icons/back.svg"/>Go back</div>
            <div class="create-resume__field">
              <div class="create-resume__field-name" @click="openTab('personal')" :class="{'create-resume__active': openTabs['personal']}">
                <h2>Personal Details</h2>
                <img :src="openTabs['personal'] ? require('../assets/icons/black-minus.svg') : require('../assets/icons/plus.svg')"/>
              </div>
                <personalDetails 
                v-show="openTabs['personal']"
                />
           </div>
            <div class="break"></div>
                <div class="create-resume__field">
                  <div class="create-resume__field-name" @click="openTab('summary')" :class="{'create-resume__active' : openTabs['summary']}">
                    <h2>Professional summary</h2>
                    <img :src="openTabs['summary'] ? require('../assets/icons/black-minus.svg') : require('../assets/icons/plus.svg')"/>
                  </div>
                    <textarea placeholder="Add your professional summary here"  v-show="openTabs['summary']" class="create-resume__professional-text" @input="updateProfessionalSummary" v-model="professionalSummary"></textarea>
                </div>
            <div class="break"></div>
                <div class="create-resume__field">
              <div class="create-resume__field-name"  @click="openTab('education')" :class="{'create-resume__active': openTabs['education']}">
                <h2>Education</h2>
                <img :src="openTabs['education'] ? require('../assets/icons/black-minus.svg') : require('../assets/icons/plus.svg')"/>
              </div>
                <educationDetails  v-show="openTabs['education']"/>
            </div>
            <div class="break"></div>
                <div class="create-resume__field">
                <div class="create-resume__field-name"  @click="openTab('employment')" :class="{'create-resume__active': openTabs['employment']}">
                  <h2>Employment History</h2>
                  <img :src="openTabs['employment'] ? require('../assets/icons/black-minus.svg') : require('../assets/icons/plus.svg')"/>
                </div>
                  <employmentHistory  v-show="openTabs['employment']"/>
               </div>
            <div class="break"></div>
                <div class="create-resume__field">
                <div class="create-resume__field-name" @click="openTab('skills')" :class="{'create-resume__active': openTabs['skills']}">
                <h2>Skills</h2>
                <img :src="openTabs['skills'] ? require('../assets/icons/black-minus.svg') : require('../assets/icons/plus.svg')"/>
              </div>
                <skillsDetails  v-show="openTabs['skills']" />
             </div>
             <div class="break"></div>
             <div class="create-resume__field">
              <div class="create-resume__field-name" @click="openTab('socials')" :class="{'create-resume__active': openTabs['socials']}">
                <h2>Socials</h2>
                <img :src="openTabs['socials'] ? require('../assets/icons/black-minus.svg') : require('../assets/icons/plus.svg')"/>
              </div>
                <socialDetails
                v-show="openTabs['socials']"
                />
             </div>
             <div class="break"></div>
        </div>
        <div class="create-resume__template">
          <vue3-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="true"
                filename="hee hee"
                :pdf-quality="2"
                :manual-pagination="false"
                :paginate-elements-by-height="1400"
                pdf-format="a4"
                @hasGenerated="hasGenerated($event)"
                ref="html2Pdf"
            >
                  <template v-slot:pdf-content>
                    <templateElement />
                  </template>
            </vue3-html2pdf>
          <div class="create-resume__template-wrap">
            <templateElement />
          </div>
          <img src="../assets/icons/download-icon.svg" @click="generatePDF" class="create-resume__template-btn">
        </div>
    </div>
    <div class="create-resume__loader" v-else>
        <loaderElement />
    </div>
</template>

<script setup>
import Vue3Html2pdf from 'vue3-html2pdf'
import { reactive, inject, ref,onBeforeMount } from 'vue';
import personalDetails from '../components/personalDetails/personalDetails.vue';
import educationDetails from '../components/educationDetails/educationDetails.vue';
import employmentHistory from '../components/employmentHistory/employmentHistory.vue';
import skillsDetails from '../components/skillsDetails/skillsDetails.vue';
import socialDetails from '../components/socials/socialDetails.vue';
import templateElement from '../components/template/template.vue';
import loaderElement from '../components/loaderElement/loaderElement.vue';

import { useResumeStore } from '@/store/cvStore';
import { useEducationStore } from '@/store/educationStore';

const router = inject('router');

const openTabs = reactive({
    personal: true,
    summary: false,
    education: false,
    employment: false,
    skills: false
});

const templateLoaded = ref(false);
const resume = useResumeStore();
const educationStore = useEducationStore();
const professionalSummary = ref();

const updateProfessionalSummary = () => {
  resume.currentResume.professionalSummary = professionalSummary.value
  resume.updatedResume.professionalSummary = professionalSummary.value
};

function openTab(tabName) {
    openTabs[tabName] = !openTabs[tabName]
}

const goBack=()=>{
  router.push('/dashboard');
}

const html2Pdf = ref(null);
async function generatePDF(){
  try {
    if(resume.currentResume.uuid){
      resume.updateResume(resume.updatedResume)
    }
    else{
      resume.createResume(resume.currentResume)  
    }
    // html2Pdf.value.generatePdf();
  }catch(error){
    console.error(error)
    alert('Sorry could not save cv')
  }
}

onBeforeMount(async()=> {
   await resume.getResume();
   await educationStore.getEducation(resume.currentResume.id);
   professionalSummary.value = resume.currentResume.professionalSummary
   templateLoaded.value = true
})

</script>
<style lang="scss" scoped>
@import '../assets/scss/index.scss';
@import '../assets/scss/pages/createResumePage.scss';
</style>