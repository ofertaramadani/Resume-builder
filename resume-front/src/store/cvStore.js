import { defineStore } from 'pinia';
import api from "@/api/api";

export const useResumeStore = defineStore('resume', {
  state: () => ({
    resumes:[],
    currentResume:{
      educations:[],
      experiences:[],
      socials:[],
      skills:[]
    },
    updatedResume:{},
    addedEducations:[],
    currentResumeEducations:[],
    currentResumeExperiences:[],
    currentResumeSocials:[],
    currentResumeSkills:[]
  }),

  actions: {
    async createResume(resume){
      try {
        return await api({ requiresAuth: true }).post(
          "/cv", resume
        );
      } catch (error) {
        console.error(
          error
        );
      }

    },
    async updateResume(resume){
      try {
        const cvId = this.currentResume.id
        console.log(cvId,'cvid')
        return await api({ requiresAuth: true }).put(
          `/cv/${cvId}`, resume
        );
      } catch (error) {
        console.error(
          error
        );
      }

    },
    async getResume(){
      try {
        const resume = await api({ requiresAuth: true }).get(
          "/cv/1"
        );
        this.currentResume = resume.data;
        this.currentResumeEducations = resume.data.educations;
        this.currentResumeExperiences = resume.data.experiences;
        this.currentResumeSkills = resume.data.skills;
        this.currentResumeSocials = resume.data.socails;
      } catch (error) {
        console.error(
          error
        );
      }
    },

    async addEducation(education){
      try {
      if(this.currentResume.id !== undefined){
        const cvId = this.currentResume.id
        await api({requiresAuth:true}).post(
          `education/${cvId}`,education
        )
        this.addedEducations.push(education)
      } else {
        this.currentResume.educations.push(education)
      }
    } catch(error){
      console.error(error)
    }
      
    },
    addExperience(experience){
      this.currentResume.experiences.push(experience)
    },
    addSkill(skill) {
      this.currentResume.skills.push(skill)
    },
    addSocial(social) {
      this.currentResume.socials.push(social)
    },
  }
});
