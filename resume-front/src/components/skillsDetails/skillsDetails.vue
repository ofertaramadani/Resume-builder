<template>
  <div class="skills">
    <div class="skills__default">
      <div
        class="skills__skill"
        v-for="(skill, index) in skillList"
        :key="index"
        @click="removeSkill(skill, index)"
      >
        <p>{{ skill.name }}</p>
      </div>
    </div>
    <div class="skills__add">
      <div class="skills__add-input">
        <input type="text" placeholder="Add a new skill" v-model="skillName" />
      </div>
      <div class="skills__add-skill" @click="addSkill()">
        <img src="../../assets/icons/black-plus.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import { useResumeStore } from "@/store/cvStore";

const resumeStore = useResumeStore();
const skillName = ref("");
let skillList = reactive([]);

const addSkill = () => {
  if (skillName.value !== "") {
    resumeStore.addSkill({ name: skillName.value });
    skillName.value = "";
  }
};

const removeSkill = (skill, index) => {
  resumeStore.removeSkill(skill.name);
  skillList.splice(index, 1);
};

onBeforeMount(() => {
  skillList = resumeStore.currentResume.skills;
});
</script>

<style lang="scss" scoped>
@import "./skillsDetails";
</style>
