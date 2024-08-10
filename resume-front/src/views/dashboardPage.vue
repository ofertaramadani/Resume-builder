<template>
  <div class="dashboard" v-if="!loading">
    <div class="dashboard__wrapper">
      <div class="menu">
        <div class="menu__logo">
          <router-link to="/">resume.</router-link>
        </div>
        <div class="menu__items">
          <div class="menu__items-second">
            <div
              class="menu__item"
              @click="openDashboard"
              :class="{ 'active-tab': isDashboardVisible }"
            >
              <img
                :src="
                  isDashboardVisible
                    ? require('../assets/icons/dashboard-white.svg')
                    : require('../assets/icons/dashboard.svg')
                "
                alt=""
              />
              <p>Dashboard</p>
            </div>
            <div
              class="menu__item"
              @click="openTemplates"
              :class="{ 'active-tab': isTemplatesVisible }"
            >
              <img
                :src="
                  isTemplatesVisible
                    ? require('../assets/icons/add-template-white.svg')
                    : require('../assets/icons/add-template.svg')
                "
                alt=""
              />
              <p>Templates</p>
            </div>
          </div>
          <div class="menu__item menu__logout" @click="logout">
            <img src="../assets/icons/logout.svg" alt="" />
            <p>Log out</p>
          </div>
        </div>
      </div>
      <div class="dashboard__add-template" v-if="isDashboardVisible">
        <div class="dashboard__create" @click="openTemplates()">
          <p>Add a new Resume</p>
          <img src="../assets/icons/add-template.svg" alt="" />
        </div>
        <div class="dashboard__existing">
          <h2>Update exisiting resumes</h2>
          <div class="dashboard__existing-resumes">
            <userDetails
              v-for="resume in resumes"
              :data="resume"
              :key="resume.uuid"
              @click="modifyResume(resume.id)"
            />
          </div>
        </div>
      </div>
      <div
        class="dashboard__templates"
        v-if="isTemplatesVisible"
        @click="openTemplates"
      >
        <h2>Pick a Template</h2>
        <ul>
          <li
            v-for="template in templateStore.templates.data"
            :key="template.id"
            @click="chooseTemplate(template.title)"
          >
            <img
              :src="require(`../../src/assets/images/${template.title}.png`)"
              alt=""
            />
            <p>{{ template.title.replace("_", " ") }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { auth } from "@/store/auth";
import { useTemplatesStore } from "@/store/templateStore";
import { useResumeStore } from "@/store/cvStore";
import { useRouter } from "vue-router";
import userDetails from "@/components/userDetails/userDetails.vue";
const store = auth();
const templateStore = useTemplatesStore();
const resumeStore = useResumeStore();

const router = useRouter();

const isDashboardVisible = ref(false);
const isTemplatesVisible = ref(false);

let loading = ref(true);
let resumes = reactive([]);

const openDashboard = () => {
  isTemplatesVisible.value = false;
  isDashboardVisible.value = true;
};
const openTemplates = () => {
  isDashboardVisible.value = false;
  isTemplatesVisible.value = true;
};
const logout = () => {
  store.logout();
};

const chooseTemplate = (template) => {
  console.log("clicked", template);
  templateStore.storeTemplate(template);
  router.push(`/resume/${template}`);
};

const modifyResume = (id) => {
  resumeStore.resumeToBeUpdated = id;
  isDashboardVisible.value = false;
  isTemplatesVisible.value = true;
};

onMounted(async () => {
  try {
    loading.value = true;
    isDashboardVisible.value = true;

    resumeStore.resumeToBeUpdated = null;
    await resumeStore.getResumes();
    await templateStore.getTemplates();
    resumes = resumeStore.resumes;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
@import "../assets/scss/pages/dashboardPage";
</style>
