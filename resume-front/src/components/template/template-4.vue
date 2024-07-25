<template>
  <div class="fancy-cv-template">
    <header :style="{ backgroundColor: localTemplateColor }">
      <div class="header-content">
        <div class="header-photo" v-if="resume.photo">
          <img :src="resume.photo" alt="User Photo" />
        </div>
        <div class="header-info">
          <h1>{{ resume.firstname }} {{ resume.lastname }}</h1>
          <h2>{{ resume.title }}</h2>
          <div class="header-contact">
            <ul>
              <li v-if="resume.email">
                <img src="../../assets/icons/email-icon.svg" alt="Email Icon" />
                {{ resume.email }}
              </li>
              <li v-if="resume.phone">
                <img src="../../assets/icons/phone-icon.svg" alt="Phone Icon" />
                {{ resume.phone }}
              </li>
              <li v-if="resume.country || resume.city">
                <img src="../../assets/icons/place-icon.svg" alt="Place Icon" />
                {{ resume.country }}, {{ resume.city }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <main>
      <section class="section-summary" v-if="resume.professionalSummary">
        <h3>Professional Summary</h3>
        <p>{{ resume.professionalSummary }}</p>
      </section>
      <section class="section-education" v-if="educations.length">
        <h3>Education</h3>
        <div class="education-list">
          <div
            v-for="(education, index) in educations"
            :key="index"
            class="education-item"
          >
            <h4>{{ education.start }} - {{ education.end }}</h4>
            <h5>{{ education.school }}, {{ education.place }}</h5>
            <h6>{{ education.title }}</h6>
            <p>{{ education.description }}</p>
          </div>
        </div>
      </section>
      <section class="section-experience" v-if="experiences.length">
        <h3>Experience</h3>
        <div class="experience-list">
          <div
            v-for="experience in experiences"
            :key="experience.id"
            class="experience-item"
          >
            <h4>{{ experience.start }} - {{ experience.end }}</h4>
            <h5>{{ experience.employer }}, {{ experience.place }}</h5>
            <h6>{{ experience.title }}</h6>
            <p>{{ experience.description }}</p>
          </div>
        </div>
      </section>
      <section class="section-skills" v-if="skills.length">
        <h3>Skills</h3>
        <ul class="skills-list">
          <li v-for="(skill, index) in skills" :key="index">
            {{ skill.name }}
          </li>
        </ul>
      </section>
      <section class="section-socials" v-if="socials.length">
        <h3>Socials</h3>
        <ul class="socials-list">
          <li v-for="(social, index) in socials" :key="index">
            {{ social.name }}
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";
import { useResumeStore } from "@/store/cvStore";

const props = defineProps(["templateColor"]);
const resumeStore = useResumeStore();

const localTemplateColor = ref(props.templateColor);
const experiences = ref([]);
const educations = ref([]);
const socials = ref([]);
const skills = ref([]);
const resume = ref({});

watch(
  () => resumeStore.currentResume,
  (newResume) => {
    resume.value = newResume;
    experiences.value = newResume.experiences;
    educations.value = newResume.educations;
    socials.value = newResume.socials;
    skills.value = newResume.skills;
  },
  { immediate: true, deep: true }
);

watch(
  () => props.templateColor,
  (newColor) => {
    localTemplateColor.value = newColor;
  }
);
</script>

<style lang="scss" scoped>
.fancy-cv-template {
  font-family: "Poppins", sans-serif;
  width: 210mm;
  height: 297mm;
  background-color: white;
  margin-bottom: 50px;
  padding: 30px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

  header {
    background-color: #6a0572;
    color: white;
    padding: 20px;
    display: flex;
    align-items: center;
    border-radius: 10px;

    .header-content {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;

      .header-photo {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        border: 5px solid white;
        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .header-info {
        flex: 1;
        margin-left: 20px;
        & h1 {
          font-size: 28px;
          margin: 0;
        }
        & h2 {
          font-size: 18px;
          margin: 5px 0;
          font-weight: 300;
        }
        .header-contact {
          & ul {
            padding: 0;
            list-style: none;
            & li {
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 5px;
              & img {
                width: 20px;
                height: 20px;
              }
            }
          }
        }
      }
    }
  }

  main {
    padding-top: 20px;
    .section-summary,
    .section-education,
    .section-experience,
    .section-skills,
    .section-socials {
      margin-bottom: 20px;
      & h3 {
        font-size: 22px;
        color: #6a0572;
        margin-bottom: 10px;
      }
      & p {
        font-size: 16px;
        margin: 0;
      }
      .education-list,
      .experience-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      .education-item,
      .experience-item {
        display: flex;
        flex-direction: column;
        background-color: #f7f7f7;
        padding: 10px;
        border-radius: 5px;
        & h4 {
          font-size: 14px;
          margin: 0;
          font-weight: 400;
          color: #6a0572;
        }
        & h5 {
          font-size: 16px;
          margin: 0;
          font-weight: 400;
        }
        & h6 {
          font-size: 18px;
          margin: 0;
          font-weight: 500;
        }
        & p {
          font-size: 14px;
          margin: 0;
          color: #333;
        }
      }
      .skills-list,
      .socials-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        & li {
          background-color: #6a0572;
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
