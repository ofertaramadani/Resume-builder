<template>
  <div class="template_3 cv-template">
    <div class="header" :style="{ backgroundColor: localTemplateColor }">
      <div class="header__left">
        <div class="header__photo" v-if="photoUrl || resume.photo">
          <img v-if="photoUrl" :src="photoUrl" alt="Image Preview" />
          <img
            v-else-if="resume.photo"
            :src="`http://localhost:3000/uploads/${resume.photo}`"
            alt="User Photo"
          />
        </div>
        <div class="header__info">
          <h1>{{ resume.firstname }} {{ resume.lastname }}</h1>
          <h2>{{ resume.title }}</h2>
        </div>
      </div>
      <div class="header__right">
        <div class="header__contact">
          <ul>
            <li v-if="resume.email">
              {{ resume.email }}
            </li>
            <li v-if="resume.phone">
              {{ resume.phone }}
            </li>
            <li v-if="resume.country || resume.city">
              {{ resume.country }}, {{ resume.city }}
            </li>
          </ul>
        </div>
        <div class="header__socials" v-if="socials.length">
          <ul>
            <li v-for="(social, index) in socials" :key="index">
              {{ social.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="section" v-if="resume.professionalSummary">
        <h3>Professional Summary</h3>
        <div class="line"></div>
        <p>{{ resume.professionalSummary }}</p>
      </div>
      <div
        class="section"
        v-if="!isArrayEmpty(educations) || !isObjectEmpty(newEducation)"
      >
        <h3>Education</h3>
        <div class="line"></div>
        <div class="education-list">
          <div
            v-for="(education, index) in educations"
            :key="index"
            class="education-item"
          >
            <h4>
              {{ education.start }} <span v-if="education.end">-</span>
              {{ education.end }}
            </h4>
            <h5>
              {{ education.school }}<span v-if="education.place">,</span>
              {{ education.place }}
            </h5>
            <h6>{{ education.title }}</h6>
            <p>{{ education.description }}</p>
          </div>
          <div class="education-item" v-if="!isObjectEmpty(newEducation)">
            <h4>
              {{ newEducation.start }} <span v-if="newEducation.end">-</span>
              {{ newEducation.end }}
            </h4>
            <h5>
              {{ newEducation.school }}<span v-if="newEducation.place">,</span>
              {{ newEducation.place }}
            </h5>
            <h6>{{ newEducation.title }}</h6>
            <p>{{ newEducation.description }}</p>
          </div>
        </div>
      </div>
      <div
        class="section"
        v-if="!isArrayEmpty(experiences) || !isObjectEmpty(newExperience)"
      >
        <h3>Experience</h3>
        <div class="line"></div>
        <div class="experience-list">
          <div
            v-for="experience in experiences"
            :key="experience.id"
            class="experience-item"
          >
            <h4>
              {{ experience.start }} <span v-if="experience.end">-</span>
              {{ experience.end }}
            </h4>
            <h5>
              {{ experience.employer }}<span v-if="experience.place">,</span>
              {{ experience.place }}
            </h5>
            <h6>{{ experience.title }}</h6>
            <p>{{ experience.description }}</p>
          </div>
          <div class="experience-item" v-if="!isObjectEmpty(newExperience)">
            <h4>
              {{ newExperience.start }} <span v-if="newExperience.end">-</span>
              {{ newExperience.end }}
            </h4>
            <h5>
              {{ newExperience.employer
              }}<span v-if="newExperience.place">,</span>
              {{ newExperience.place }}
            </h5>
            <h6>{{ newExperience.title }}</h6>
            <p>{{ newExperience.description }}</p>
          </div>
        </div>
      </div>
      <div class="section" v-if="skills.length">
        <h3>Skills</h3>
        <div class="line"></div>
        <ul class="skills-list">
          <li v-for="(skill, index) in skills" :key="index">
            {{ skill.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({ resumeDetails: Object, photo: Object });

const resume = ref(props.resumeDetails.currentResume);
const educations = ref(resume.value.educations);
const experiences = ref(resume.value.experiences);
const skills = ref(resume.value.skills);
const socials = ref(resume.value.socials);
const newEducation = ref(props.resumeDetails.newEducation);
const newExperience = ref(props.resumeDetails.newExperience);

const photoUrl = ref(null);

watch(
  () => props.photo,
  (newFile) => {
    if (newFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        photoUrl.value = e.target.result;
      };
      reader.readAsDataURL(newFile);
    } else {
      photoUrl.value = null;
    }
  }
);

const isObjectEmpty = (obj) => {
  return Object.keys(obj).every((key) => obj[key] === "");
};
const isArrayEmpty = (array) => {
  return array.length === 0;
};
</script>

<style lang="scss" scoped>
.template_3 {
  overflow: scroll;
  font-family: "Poppins";
  width: 210mm;
  height: 297mm;
  background-color: white;
  margin-bottom: 50px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    &__photo {
      width: 150px;
      height: 150px;
      margin-right: 20px;
      border-radius: 50%;
      & img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    &__left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    &__info {
      & h1 {
        font-size: 24px;
        margin: 0;
      }
      & h2 {
        font-size: 16px;
        margin: 0;
      }
    }
    &__right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      &__contact,
      &__socials {
        margin-bottom: 10px;
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

  .main-content {
    padding-top: 20px;
    .section {
      margin-bottom: 20px;
      & h3 {
        font-size: 18px;
        margin: 0 0 10px 0;
        color: rgb(29, 18, 91);
      }
      .line {
        width: 100%;
        height: 1px;
        background-color: rgb(29, 18, 91);
        margin-bottom: 10px;
      }
      & p {
        font-size: 14px;
        margin: 0;
      }
      .education-list,
      .experience-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .education-item,
      .experience-item {
        display: flex;
        flex-direction: column;
        gap: 5px;
        & h4 {
          font-size: 14px;
          margin: 0;
        }
        & h5 {
          font-size: 14px;
          margin: 0;
          font-weight: 400;
        }
        & h6 {
          font-size: 16px;
          margin: 0;
          font-weight: 500;
        }
        & p {
          font-size: 12px;
          margin: 0;
          font-weight: 400;
        }
      }
      .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        & li {
          background-color: rgb(29, 18, 91);
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
