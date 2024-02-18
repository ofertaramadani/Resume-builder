<template>
    <div class="template">
        <div class="template-side">
            <div class="template-side__personal">
                <div class="template-side__info template-side__info-profile" v-if="resume.photo">
                    <div class="template-side__info-img">
                        <img :src="resume.photo" alt="User Photo">
                    </div>
                </div>
                <div class="template-side__info-title" v-if="resume.email || resume.phone || resume.city || resume.country">
                    <h2>Contact</h2>
                    <div class="line"></div>
                    <div class="template-side__info" v-if="resume.email" >
                        <img src="../../assets/icons/email-icon.svg" alt="">
                        <p>{{ resume.email }}</p>
                    </div>
                    <div class="template-side__info" v-if="resume.phone">
                        <img src="../../assets/icons/phone-icon.svg" alt="">
                        <p>{{ resume.phone }}</p>
                    </div>
                    <div class="template-side__info" v-if="resume.country || resume.city">
                        <img src="../../assets/icons/place-icon.svg" alt="">
                        <p>{{ resume.country }}, {{  resume.city }}</p>
                    </div>
                </div>
                <div class="template-side__info-title" v-if="socials">
                    <h2>Socials</h2>
                    <div class="line"></div>
                    <div class="template-side__info">
                        <ul>
                            <li v-for="(social,index) in resumeStore.currentResume.socials" :key="index"><p>{{ social.name }}</p></li>
                        </ul>
                    </div>
                </div>
                <div class="template-side__info-title" v-if="skills">
                    <h2>Skills</h2>
                    <div class="line"></div>
                    <div class="template-side__info">
                        <ul>
                            <li v-for="(skill,index) in resumeStore.currentResume.skills" :key="index"><p>{{ skill.name }}</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="template-info">
            <div class="template-info__wrap">
                <div class="template-info__title">
                    <h1>{{ resume.firstname }} {{  resume.lastname }}</h1>
                    <h2>{{ resume.title }}</h2>
                </div>
                <div class="template-info__summary" v-if="resumeStore.currentResume.professionalSummary">
                    <h2>Professional Summary</h2>
                    <div class="line"></div>
                    <p>{{ resumeStore.currentResume.professionalSummary }}</p>
                </div>
                <div class="template-info__summary">
                    <h2>Education</h2>
                    <div class="line"></div>
                    <div class="template-info__education">
                        <div class="template-info__education-wrap" v-for="(education,index) in educations" :key="index">
                            <h4 v-if="education.start !== ''">{{ education.start }} <span v-if="education.end !== ''">/</span> {{ education.end }}</h4>
                            <h3 v-if="education.school !== ''">{{ education.school }}</h3>
                            <h2 v-if="education.title !== ''">{{ education.title }}</h2>
                            <p v-if="education.description !== ''">{{ education.description }}</p>
                        </div>
                    </div>
                </div>
                <div class="template-info__summary">
                    <h2>Experience</h2>
                    <div class="line"></div>
                    <div class="template-info__education">
                        <div class="template-info__education-wrap" v-for="experience in experiences" :key="experience.id">
                            <h4>{{ experience.start }} <span v-if="experience.end">/</span> {{ experience.end }}</h4>
                            <h3>{{ experience.school }}</h3>
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
import { useResumeStore } from '@/store/cvStore';
import { onBeforeMount, reactive, ref, watch} from 'vue';

const resumeStore = useResumeStore(); 
var experiences = reactive([]);
var educations = ref([]);
var socials = reactive([]);
var skills = reactive([]);
var resume = reactive({});

watch(resumeStore.currentResume,async(newVal) => {
    if(resumeStore.addedEducations.length > 0){
        educations.value = newVal.educations.concat(resumeStore.addedEducations)
    }
    else {
        educations.value = newVal.educations
    }
    experiences.value = newVal.experiences
}, { deep: true })

watch(resumeStore.addedEducations,async(newVal) => {
    if(resumeStore.currentResume.educations.length > 0) {
        educations.value = newVal.concat(resumeStore.currentResume.educations)
        console.log('aa',educations.value)
    }
    else {
        educations.value = newVal
    }
}, { deep: true })

onBeforeMount(()=> {
    resume = resumeStore.currentResume;
    experiences = resumeStore.currentResumeExperiences;
    educations.value = resumeStore.currentResumeEducations.concat(resumeStore.addedEducations)
    socials = resumeStore.currentResumeSocials;
    skills = resumeStore.currentResumeSkills;
})

</script>

<style lang="scss" scoped>
@import '../template/template.scss';
</style>