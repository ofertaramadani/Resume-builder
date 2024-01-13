<template>
    <div class="skills">
        <div class="skills__default" v-for="(skill, index) in skillList" :key="index">
            <div class="skills__skill">
                <p>{{ skill }}</p>
            </div>
        </div>
        <div class="skills__add">
            <div class="skills__skill skills__add-skill" @click="addSkill()">
                <p>Add a skill</p>
            </div>
            <div class="skills__add-input">
                <input type="text" placeholder="Add a new skill" v-model="skillName"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const skillList = ref([]);
const skillName = ref('');

const addSkill=()=> {
    if(skillName.value !== ''){
    skillList.value.push(skillName.value);
    skillName.value=''
    }
}


</script>

<style lang="scss" scoped>
@import './skillsDetails';
</style>