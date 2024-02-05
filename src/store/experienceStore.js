import { defineStore } from 'pinia';
import api from "@/api/api";

export const useExperienceStore = defineStore('experience', {
  state: () => ({
    experiences: [], 
  }),

  actions: {
    async getExperience(){
      try {
        const res = await api({ requiresAuth: true }).get(
          "/experience"
        );
        const allExperiences = res.data;
        allExperiences.forEach((experience) => this.experiences.push(experience))
      } catch (error) {
        console.error(
          error
        );
      }
    },

    async addExperience(experience) {
      try {
      this.experiences.push(experience);
      await api({ requiresAuth:true }).post(
        "/experience", experience
      );
      }catch(error){
        console.error(error)
      }
    },

    async updateExperience(experience) {
      try {
      await api({ requiresAuth:true }).put(
        "/experience", experience
      );
      }catch(error){
        console.error(error)
      }
    },

    removeExperience(index) {
      this.experiences.splice(index, 1);
    },
  },
});
