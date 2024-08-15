<template>
  <div class="create-resume" v-if="templateLoaded">
    <div class="create-resume__fields">
      <div class="create-resume__back" @click="goBack()">
        <img src="../assets/icons/back.svg" />Go back
      </div>
      <div class="create-resume__field">
        <div
          class="create-resume__field-name"
          @click="openTab('personal')"
          :class="{ 'create-resume__active': openTabs['personal'] }"
        >
          <h2>Personal Details</h2>
          <img
            :src="
              openTabs['personal']
                ? require('../assets/icons/black-minus.svg')
                : require('../assets/icons/plus.svg')
            "
          />
        </div>
        <personalDetails v-show="openTabs['personal']" />
      </div>
      <div class="break"></div>
      <div class="create-resume__field">
        <div
          class="create-resume__field-name"
          @click="openTab('summary')"
          :class="{ 'create-resume__active': openTabs['summary'] }"
        >
          <h2>Professional summary</h2>
          <img
            :src="
              openTabs['summary']
                ? require('../assets/icons/black-minus.svg')
                : require('../assets/icons/plus.svg')
            "
          />
        </div>
        <textarea
          placeholder="Add your professional summary here *"
          v-show="openTabs['summary']"
          class="create-resume__professional-text"
          @input="updateProfessionalSummary"
          v-model="professionalSummary"
        ></textarea>
      </div>
      <div class="break"></div>
      <div class="create-resume__field">
        <div
          class="create-resume__field-name"
          @click="openTab('education')"
          :class="{ 'create-resume__active': openTabs['education'] }"
        >
          <h2>Education</h2>
          <img
            :src="
              openTabs['education']
                ? require('../assets/icons/black-minus.svg')
                : require('../assets/icons/plus.svg')
            "
          />
        </div>
        <educationDetails v-show="openTabs['education']" />
      </div>
      <div class="break"></div>
      <div class="create-resume__field">
        <div
          class="create-resume__field-name"
          @click="openTab('employment')"
          :class="{ 'create-resume__active': openTabs['employment'] }"
        >
          <h2>Employment History</h2>
          <img
            :src="
              openTabs['employment']
                ? require('../assets/icons/black-minus.svg')
                : require('../assets/icons/plus.svg')
            "
          />
        </div>
        <employmentHistory v-show="openTabs['employment']" />
      </div>
      <div class="break"></div>
      <div class="create-resume__field">
        <div
          class="create-resume__field-name"
          @click="openTab('skills')"
          :class="{ 'create-resume__active': openTabs['skills'] }"
        >
          <h2>Skills</h2>
          <img
            :src="
              openTabs['skills']
                ? require('../assets/icons/black-minus.svg')
                : require('../assets/icons/plus.svg')
            "
          />
        </div>
        <skillsDetails v-show="openTabs['skills']" />
      </div>
      <div class="break"></div>
      <div class="create-resume__field">
        <div
          class="create-resume__field-name"
          @click="openTab('socials')"
          :class="{ 'create-resume__active': openTabs['socials'] }"
        >
          <h2>Socials</h2>
          <img
            :src="
              openTabs['socials']
                ? require('../assets/icons/black-minus.svg')
                : require('../assets/icons/plus.svg')
            "
          />
        </div>
        <socialDetails v-show="openTabs['socials']" />
      </div>
      <div class="break"></div>
    </div>
    <div class="create-resume__template" :class="{ 'dark-bg': !notSaved }">
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
          <component :is="chosenTemplate" :resumeDetails="resume" />
        </template>
      </vue3-html2pdf>
      <div class="create-resume__template-wrap">
        <component :is="chosenTemplate" :resumeDetails="resume" />
      </div>
      <div class="save-icons" v-if="resume.validateFields()">
        <img
          v-if="notSaved"
          src="../assets/icons/download-icon.svg"
          @click="generatePDF"
          class="create-resume__template-btn"
        />
        <span v-else class="save-icon create-resume__template-btn">
          <span class="loader"></span>
          <span class="loader"></span>
          <span class="loader"></span>
        </span>
      </div>
      <div class="create-resume__template-btn white" v-else>
        Fill the required (*) fields, to download save the resume
      </div>
    </div>
  </div>
  <div class="create-resume__loader" v-else>
    <loaderElement />
  </div>
</template>

<script setup>
import Vue3Html2pdf from "vue3-html2pdf";
import { defineAsyncComponent, reactive, ref, onMounted } from "vue";
import personalDetails from "../components/personalDetails/personalDetails.vue";
import educationDetails from "../components/educationDetails/educationDetails.vue";
import employmentHistory from "../components/employmentHistory/employmentHistory.vue";
import skillsDetails from "../components/skillsDetails/skillsDetails.vue";
import socialDetails from "../components/socials/socialDetails.vue";
import loaderElement from "../components/loaderElement/loaderElement.vue";

import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import { useResumeStore } from "@/store/cvStore";

const route = useRoute();
const router = useRouter();
let updateCvId = ref("");
let chosenTemplate = ref("");
let resumeFinished = ref(false);
let notSaved = ref(true);
const openTabs = reactive({
  personal: true,
  summary: false,
  education: false,
  employment: false,
  skills: false,
});

const templateLoaded = ref(false);
const resume = useResumeStore();
const professionalSummary = ref();

const updateProfessionalSummary = () => {
  resume.currentResume.professionalSummary = professionalSummary.value;
  resume.updatedResume.professionalSummary = professionalSummary.value;
};

function openTab(tabName) {
  openTabs[tabName] = !openTabs[tabName];
}

const goBack = () => {
  router.back();
  resume.resumeToBeUpdated = null;
};

const html2Pdf = ref(null);
async function generatePDF() {
  try {
    resume.currentResume.uuid
      ? await resume.updateResume(resume.currentResume)
      : await resume.createResume(resume.currentResume);
    resumeFinished.value = true;
    notSaved.value = false;
    html2Pdf.value.generatePdf();
    setTimeout(() => {
      notSaved.value = true;
    }, 3000);
  } catch (error) {
    console.error(error);
    alert("Sorry could not save cv");
  }
}
onBeforeRouteLeave(async (to, from, next) => {
  if (resumeFinished.value === false) {
    await generatePDF();
  }
  resume.resumeToBeUpdated = null;
  location.reload();
  next(); // Ensure to call next() to proceed with navigation
});
onMounted(async () => {
  try {
    updateCvId.value = resume.resumeToBeUpdated;
    let templateName = route.params.resumeId;
    chosenTemplate.value = await defineAsyncComponent(() =>
      import(`../components/template/${templateName}.vue`)
    );
    if (updateCvId?.value) {
      await resume.getResume(updateCvId.value);
      professionalSummary.value = resume.currentResume.professionalSummary;
    }
  } catch (e) {
    console.error("e", e);
  } finally {
    templateLoaded.value = true;
  }
});
</script>
<style lang="scss" scoped>
@import "../assets/scss/index.scss";
@import "../assets/scss/pages/createResumePage.scss";
.dark-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Adjust the color and transparency */
  z-index: 1; /* Ensure the overlay is on top */
}
.save-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;

  background: white;
  height: 40px;
  width: 35px;
  display: block;
  padding-top: 10px;

  -moz-border-radius: 3px;
  border-radius: 3px;
}

.save-icon:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  border-width: 0 10px 10px 0;
  border-style: solid;
  border-color: #a4a6a7 #3c4145;
}

.save-icon:after {
  content: "✓";
  color: green;
  font-size: 30px;
  position: absolute;
  top: 15%;
  left: 20%;
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  transform: scale(0);

  -webkit-animation: pop 0.5s 2s forwards;
  -moz-animation: pop 0.5s 2s forwards;
  animation: pop 0.5s 2s forwards;
}

.loader {
  background: #e2e2e2;
  width: 80%;
  height: 5px;
  display: block;
  margin: 3px auto;

  position: relative;
  overflow: hidden;

  -webkit-animation: fade-loaders 0.2s 3s forwards;
  -moz-animation: fade-loaders 0.2s 3s forwards;
  animation: fade-loaders 0.2s 3s forwards;
}

.loader:after {
  content: "";
  background: #2c3033;
  width: 0;
  height: 5px;
  position: absolute;
  top: 0;
  left: 0;
}

.loader:first-child:after {
  -webkit-animation: loader 0.4s 1s forwards;
  -moz-animation: loader 0.4s 1s forwards;
  animation: loader 0.4s 1s forwards;
}

.loader:nth-child(2n):after {
  -webkit-animation: loader 0.4s 1.5s forwards;
  -moz-animation: loader 0.4s 1.5s forwards;
  animation: loader 0.4s 1.5s forwards;
}

.loader:nth-child(3n):after {
  -webkit-animation: loader 0.4s 2s forwards;
  -moz-animation: loader 0.4s 2s forwards;
  animation: loader 0.4s 2s forwards;
}

@-webkit-keyframes loader {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
@-moz-keyframes loader {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
@keyframes loader {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@-webkit-keyframes pop {
  0% {
    -webkit-transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
@-moz-keyframes pop {
  0% {
    -moz-transform: scale(0);
  }
  100% {
    -moz-transform: scale(1);
  }
}
@keyframes pop {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@-webkit-keyframes fade-loaders {
  0% {
    opactity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-moz-keyframes fade-loaders {
  0% {
    opactity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fade-loaders {
  0% {
    opactity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
