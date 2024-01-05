<template>
    <div class="dashboard">
        <div class="dashboard__wrapper">
            <div class="menu">
                <div class="menu__logo">
                    resume.
                </div>
                <div class="menu__items">
                    <div class="menu__item" @click="openDashboard" :class="{'active-tab':isDashboardVisible}"><img :src="isDashboardVisible ? require('../assets/icons/dashboard-white.svg'): require('../assets/icons/dashboard.svg')" alt=""><p>Dashboard</p></div>
                    <div class="menu__item" @click="openTemplates" :class="{'active-tab':isTemplatesVisible}"><img :src="isTemplatesVisible ? require('../assets/icons/add-template-white.svg'): require('../assets/icons/add-template.svg')" alt=""><p>Templates</p></div>
                    <div class="menu__item menu__logout">
                    <img src="../assets/icons/logout.svg" alt=""><p>Log out</p>
                </div>
                </div>
            </div>
            <div class="dashboard__add-template" v-if="isDashboardVisible">
                <div class="dashboard__create">
                    <p>Add a new resume</p>
                    <img src="../assets/icons/add-template.svg" alt="">
                </div>
                <div class="dashboard__existing">
                    <h2>Existing resumes</h2>
                    <div class="dashboard__existing-resumes"></div>
                </div>
            </div>
            <div class="dashboard__templates" v-if="isTemplatesVisible" @click="openTemplates">
                qitu templates
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDashboardVisible = ref(false);
const isTemplatesVisible = ref(false);
const openDashboard=()=>{
    isTemplatesVisible.value=false;
    isDashboardVisible.value=true;
}
const openTemplates=()=>{
    isDashboardVisible.value=false;
    isTemplatesVisible.value=true;
}
onMounted(()=> {
    isDashboardVisible.value=true;
})
</script>


<style lang="scss" scoped>
@import '../assets/scss/index.scss';
@import '../assets/scss/pages/dashboardPage';
</style>