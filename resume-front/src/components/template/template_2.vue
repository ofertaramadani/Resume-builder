<template>
  <div class="template_2 cv-template">
    <div class="header" :style="{ backgroundColor: localTemplateColor }">
      <div class="header__photo" v-if="resume.photo">
        <img :src="resume.photo" alt="User Photo" />
      </div>
      <div class="header__info">
        <h1>{{ resume.firstname }} {{ resume.lastname }}</h1>
        <h2>{{ resume.title }}</h2>
      </div>
    </div>
    <div class="main-content">
      <div class="sidebar">
        <div
          class="section"
          v-if="resume.email || resume.phone || resume.city || resume.country"
        >
          <h3>Contact</h3>
          <div class="line"></div>
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
        <div class="section" v-if="resume.socials.length">
          <h3>Socials</h3>
          <div class="line"></div>
          <ul>
            <li v-for="(social, index) in resume.socials" :key="index">
              {{ social.name }}
            </li>
          </ul>
        </div>
        <div class="section" v-if="resume.skills.length">
          <h3>Skills</h3>
          <div class="line"></div>
          <ul>
            <li v-for="(skill, index) in resume.skills" :key="index">
              {{ skill.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="section" v-if="resume.professionalSummary">
          <h3>Professional Summary</h3>
          <div class="line"></div>
          <p>{{ resume.professionalSummary }}</p>
        </div>
        <div class="section" v-if="resume.educations.length">
          <h3>Education</h3>
          <div class="line"></div>
          <div class="education-list">
            <div
              v-for="(education, index) in resume.educations"
              :key="index"
              class="education-item"
            >
              <h4>{{ education.start }} - {{ education.end }}</h4>
              <h5>{{ education.school }}, {{ education.place }}</h5>
              <h6>{{ education.title }}</h6>
              <p>{{ education.description }}</p>
            </div>
            <div class="education-item">
              <h4>
                {{ resumeStore.newEducation.start }} -
                {{ resumeStore.newEducation.end }}
              </h4>
              <h5>
                {{ resumeStore.newEducation.school }},
                {{ resumeStore.newEducation.place }}
              </h5>
              <h6>{{ resumeStore.newEducation.title }}</h6>
              <p>{{ resumeStore.newEducation.description }}</p>
            </div>
          </div>
        </div>
        <div class="section" v-if="resume.experiences.length">
          <h3>Experience</h3>
          <div class="line"></div>
          <div class="experience-list">
            <div
              v-for="experience in resume.experiences"
              :key="experience.id"
              class="experience-item"
            >
              <h4>{{ experience.start }} - {{ experience.end }}</h4>
              <h5>{{ experience.employer }}, {{ experience.place }}</h5>
              <h6>{{ experience.title }}</h6>
              <p>{{ experience.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive } from "vue";
import { useResumeStore } from "@/store/cvStore";

const resumeStore = useResumeStore();
let resume = reactive({});

onBeforeMount(() => {
  resume = resumeStore.currentResume;
  console.log("ressume", resume);
});
</script>

<style lang="scss" scoped>
.cv-template {
  font-family: "Poppins";
  width: 210mm;
  height: 297mm;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 50px;

  .header {
    display: flex;
    padding: 20px;
    &__photo {
      width: 150px;
      height: 150px;
      margin-right: 20px;
      & img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      & h1 {
        font-size: 30px;
        margin: 0;
      }
      & h2 {
        font-size: 20px;
        margin: 0;
      }
    }
  }

  .main-content {
    display: flex;
    padding: 20px;
    .sidebar {
      width: 30%;
      padding-right: 20px;
      border-right: 1px solid #ccc;
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
        & ul {
          padding: 0;
          list-style: none;
          & li {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
            & img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
    .content {
      width: 70%;
      padding-left: 20px;
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
      }
    }
  }
}
</style>
