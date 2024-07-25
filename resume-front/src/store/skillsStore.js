import { defineStore } from "pinia";

export const useSkillsStore = defineStore("skills", {
  state: () => ({
    skills: [],
  }),
  actions: {
    addSkill(skill) {
      this.skills.push(skill);
    },
  },
});
