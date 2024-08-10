import { defineStore } from "pinia";
import api from "@/api/api";

export const useEducationStore = defineStore("education", {
  state: () => ({
    professionalSummary: "",
    educations: [],
    newEducation: {
      title: "",
      school: "",
      place: "",
      start: "",
      end: "",
      description: "",
    },
  }),

  actions: {
    setProfessionalSummary(summary) {
      this.professionalSummary = summary;
    },

    async getEducation(cvId) {
      try {
        const res = await api({ requiresAuth: true }).get(`/education/${cvId}`);
        const allEducations = res.data;
        allEducations.forEach((education) => this.educations.push(education));
      } catch (error) {
        console.error(error);
      }
    },

    async updateEducation(education) {
      try {
        await api({ requiresAuth: true }).put("/education", education);
      } catch (error) {
        console.error(error);
      }
    },

    // async removeEducation(cvId,educationId) {
    //   try {
    //   await api({ requiresAuth:true }).delete(
    //     `/education/${cvId}/${educationId}`
    //   );
    //   const indexToRemove = this.educations.findIndex(edu => edu.id === educationId);
    //   if (indexToRemove !== -1) {
    //     this.educations.splice(indexToRemove, 1);
    //   }
    //   }catch(error){
    //     console.error(error)
    //   }
    // },
  },
});
