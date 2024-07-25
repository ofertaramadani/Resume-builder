<template>
    <div class="skills">
        <div class="skills__default">
            <div class="skills__skill" v-for="(skill, index) in skillList" :key="index" @click="removeSkill(skill,index)">
                <p>{{ skill }}</p>
            </div>
        </div>
        <div class="skills__add">
            <div class="skills__add-input">
                <input type="text" placeholder="Add a new skill" v-model="skillName"/>
            </div>
            <div class="skills__add-skill" @click="addSkill()">
                <img src="../../assets/icons/black-plus.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// import { useSkillsStore } from '@/store/skillsStore';

// const skillsStore = useSkillsStore();
import {useResumeStore} from '@/store/cvStore';
const resumeStore = useResumeStore();
const skillList = ref([]);
const skillName = ref('');

const addSkill=()=> {
    if(skillName.value !== ''){
    resumeStore.addSkill({name:skillName.value});
    skillList.value.push(skillName.value);
    skillName.value=''
    }
}

const removeSkill=(skill,index)=>{
    resumeStore.removeSkill(skill)
    skillList.value.splice(index,1)
}


</script>

<style lang="scss" scoped>
@import './skillsDetails';
</style>