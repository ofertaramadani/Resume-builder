<template>
  <div class="template">
    <div class="template-side" :style="{ backgroundColor: localTemplateColor }">
      <div class="template-side__personal">
        <div
          class="template-side__info template-side__info-profile"
          v-if="resume.photo"
        >
          <div class="template-side__info-img">
            <img :src="resume.photo" alt="User Photo" />
          </div>
        </div>
        <div
          class="template-side__info-title"
          v-if="resume.email || resume.phone || resume.city || resume.country"
        >
          <h2>Contact</h2>
          <div class="line"></div>
          <div class="template-side__info" v-if="resume.email">
            <img src="../../assets/icons/email-icon.svg" alt="" />
            <p>{{ resume.email }}</p>
          </div>
          <div class="template-side__info" v-if="resume.phone">
            <img src="../../assets/icons/phone-icon.svg" alt="" />
            <p>{{ resume.phone }}</p>
          </div>
          <div class="template-side__info" v-if="resume.country || resume.city">
            <img src="../../assets/icons/place-icon.svg" alt="" />
            <p>{{ resume.country }}, {{ resume.city }}</p>
          </div>
        </div>
        <div class="template-side__info-title" v-if="socials.length">
          <h2>Socials</h2>
          <div class="line"></div>
          <div class="template-side__info">
            <ul>
              <li v-for="(social, index) in socials" :key="index">
                <p>{{ social.name }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="template-side__info-title" v-if="skills.length">
          <h2>Skills</h2>
          <div class="line"></div>
          <div class="template-side__info">
            <ul>
              <li v-for="(skill, index) in skills" :key="index">
                <p>{{ skill.name }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="template-info">
      <div class="template-info__wrap">
        <div class="template-info__title">
          <h1>{{ resume.firstname }} {{ resume.lastname }}</h1>
          <h2>{{ resume.title }}</h2>
        </div>
        <div class="template-info__summary" v-if="resume.professionalSummary">
          <h2>Professional Summary</h2>
          <div class="line"></div>
          <p>{{ resume.professionalSummary }}</p>
        </div>
        <div class="template-info__summary">
          <h2>Education</h2>
          <div class="line"></div>
          <div class="template-info__education">
            <div
              class="template-info__education-wrap"
              v-for="(education, index) in educations"
              :key="index"
            >
              <h4 v-if="education.start">
                {{ education.start }}<span v-if="education.end"> / </span
                >{{ education.end }}
              </h4>
              <h3 v-if="education.school || education.place">
                <span v-if="education.school">{{ education.school }}</span>
                <span v-if="education.place"> - {{ education.place }}</span>
              </h3>
              <h2 v-if="education.title">{{ education.title }}</h2>
              <p v-if="education.description">{{ education.description }}</p>
            </div>
          </div>
        </div>
        <div class="template-info__summary">
          <h2>Experience</h2>
          <div class="line"></div>
          <div class="template-info__education">
            <div
              class="template-info__education-wrap"
              v-for="experience in experiences"
              :key="experience.id"
            >
              <h4>
                {{ experience.start }}<span v-if="experience.end"> / </span
                >{{ experience.end }}
              </h4>
              <h3 v-if="experience.employer || experience.place">
                <span v-if="experience.employer">{{
                  experience.employer
                }}</span>
                <span v-if="experience.place"> - {{ experience.place }}</span>
              </h3>
              <h2>{{ experience.title }}</h2>
              <p>{{ experience.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";
import { useResumeStore } from "@/store/cvStore";

const props = defineProps(["templateColor"]);
const resumeStore = useResumeStore();

const localTemplateColor = ref(props.templateColor);
console.log("haha", localTemplateColor);
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
.template {
  font-family: "Poppins";
  width: 210mm;
  height: 297mm;
  display: flex;
  background-color: white;
  margin-bottom: 50px;
  &-side {
    width: 35%;
    height: 100%;
    background-color: rgb(29, 18, 91);
    &__personal {
      padding: 30px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 20px;
    }
    &__info {
      display: flex;
      align-items: center;
      gap: 10px;
      &-title {
        display: flex;
        flex-direction: column;
        gap: 10px;
        & h2 {
          font-size: 16px;
          color: white;
          font-weight: 600;
        }
        .line {
          width: 100%;
          height: 1px;
          background-color: white;
        }
      }
      &-img {
        width: 150px;
        height: 150px;
        justify-self: center;
        & img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      &-profile {
        justify-content: center;
      }
      & p {
        font-size: 12px;
        color: white;
        font-weight: 400;
        text-transform: capitalize;
      }
      & ul {
        display: flex;
        flex-direction: column;
        gap: 10px;
        & li {
          display: flex;
          align-items: center;
          gap: 10px;
          &::before {
            content: url(../../assets/icons/circle-icon.svg);
          }
        }
      }
    }
  }
  &-info {
    width: 65%;
    &__wrap {
      padding: 30px 20px;
      display: flex;
      flex-direction: column;
      gap: 50px;
    }
    &__title {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 1px solid rgb(29, 18, 91);
      border-style: dotted;
      padding: 20px 0;
      gap: 10px;
      & h1 {
        font-size: 25px;
        display: flex;
        justify-content: center;
        color: black;
        font-weight: 600;
        // text-transform: uppercase;
      }
      & h2 {
        font-size: 15px;
        display: flex;
        justify-content: center;
        color: black;
        font-weight: 400;
        // text-transform: uppercase;
      }
    }
    &__summary {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .line {
        width: 100%;
        height: 1px;
        background-color: rgb(29, 18, 91);
      }
      & h2 {
        font-size: 18px;
        font-weight: 600;
      }
      & p {
        font-size: 14px;
      }
    }
    &__education {
      display: flex;
      flex-direction: column;
      gap: 20px;
      &-wrap {
        display: flex;
        flex-direction: column;
        gap: 5px;
        & p {
          font-size: 12px;
          font-weight: 400;
          color: rgb(67, 65, 65);
        }
        & h3 {
          font-size: 12px;
          font-weight: 400;
          color: rgb(39, 38, 38);
        }
        & h2 {
          font-size: 16px;
          font-weight: 500;
        }
        & h4 {
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
