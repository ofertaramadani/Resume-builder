<template>
  <div class="modern-cv-template">
    <header :style="{ backgroundColor: localTemplateColor }">
      <div class="header-content">
        <div class="header-photo" v-if="resume.photo">
          <img :src="resume.photo" alt="User Photo" />
        </div>
        <div class="header-info">
          <h1>{{ resume.firstname }} {{ resume.lastname }}</h1>
          <h2>{{ resume.title }}</h2>
          <div class="header-contact">
            <div v-if="resume.email">
              <img src="../../assets/icons/email-icon.svg" alt="Email Icon" />
              <span>{{ resume.email }}</span>
            </div>
            <div v-if="resume.phone">
              <img src="../../assets/icons/phone-icon.svg" alt="Phone Icon" />
              <span>{{ resume.phone }}</span>
            </div>
            <div v-if="resume.country || resume.city">
              <img src="../../assets/icons/place-icon.svg" alt="Place Icon" />
              <span>{{ resume.country }}, {{ resume.city }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <section class="section-about" v-if="resume.professionalSummary">
        <h3>About Me</h3>
        <p>{{ resume.professionalSummary }}</p>
      </section>
      <div class="main-content">
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
      </div>
      <aside>
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
      </aside>
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
.modern-cv-template {
  font-family: "Poppins", sans-serif;
  width: 210mm;
  height: 297mm;
  background-color: white;
  margin-bottom: 50px;
  padding: 30px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;

  header {
    background-color: #3a3f58;
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
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid white;
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
          font-size: 20px;
          margin: 5px 0;
          font-weight: 300;
        }
        .header-contact {
          margin-top: 10px;
          & div {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 5px;
            & img {
              width: 20px;
              height: 20px;
            }
            & span {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .section-about {
    h3 {
      font-size: 22px;
      color: #3a3f58;
      margin-bottom: 10px;
    }
  }
  main {
    display: grid;
    gap: 20px;

    .main-content {
      flex: 2;

      .section-about,
      .section-education,
      .section-experience {
        margin-bottom: 20px;
        & h3 {
          font-size: 22px;
          color: #3a3f58;
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
            color: #3a3f58;
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
      }
    }

    aside {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .section-skills,
      .section-socials {
        background-color: #f7f7f7;
        padding: 20px;
        border-radius: 5px;

        & h3 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #3a3f58;
        }

        .skills-list,
        .socials-list {
          display: flex;
          gap: 10px;

          & li {
            background-color: #3a3f58;
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
