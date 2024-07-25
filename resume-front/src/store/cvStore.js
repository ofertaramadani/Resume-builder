import { defineStore } from "pinia";
import api from "@/api/api";

export const useResumeStore = defineStore("resume", {
  state: () => ({
    resumes: [],
    currentResume: {
      educations: [],
      experiences: [],
      socials: [],
      skills: [],
    },
    updatedResume: {
      educations: [],
      experiences: [],
      socials: [],
      skills: [],
    },
    addedEducations: [],
    currentResumeEducations: [],
    currentResumeExperiences: [],
    currentResumeSocials: [],
    currentResumeSkills: [],
  }),

  actions: {
    async createResume(resume) {
      try {
        return await api({ requiresAuth: true }).post("/cv", resume);
      } catch (error) {
        console.error("Errorj", error);
      }
    },
    async updateResume(resume) {
      try {
        console.log("resume", resume);
        const cvId = this.currentResume.id;
        let res = await api({ requiresAuth: true }).put(`/cv/${cvId}`, resume);
        console.log("On update response:", res);
      } catch (error) {
        console.error(error);
      }
    },
    async getResume() {
      try {
        const resume = await api({ requiresAuth: true }).get("/cv/1");
        this.currentResume = resume.data;
        this.currentResumeEducations = resume.data.educations;
        this.currentResumeExperiences = resume.data.experiences;
        this.currentResumeSkills = resume.data.skills;
        this.currentResumeSocials = resume.data.socails;
      } catch (error) {
        console.error(error);
      }
    },

    removeEducation(education) {
      this.currentResume.educations = this.currentResume.educations.filter(
        (edu) => {
          return edu !== education;
        }
      );
    },
    removeExperience(experience) {
      this.currentResume.experiences = this.currentResume.experiences.filter(
        (ex) => {
          return ex !== experience;
        }
      );
    },
    removeSkill(skill) {
      this.currentResume.skills = this.currentResume.skills.filter((sk) => {
        return sk.name !== skill;
      });
    },
    removeSocial(social) {
      this.currentResume.socials = this.currentResume.socials.filter((sc) => {
        return sc.name !== social;
      });
    },
    addEducation(education) {
      this.currentResume.educations.push(education);
    },
    addExperience(experience) {
      this.currentResume.experiences.push(experience);
    },
    addSkill(skill) {
      this.currentResume.skills.push(skill);
    },
    addSocial(social) {
      this.currentResume.socials.push(social);
    },
    async getAiSkills(jobDescription) {
      try {
        let res = await api({ requiresAuth: true }).post("/skill/extract", {
          jobDescription: jobDescription,
        });
        console.log("On update response:", res);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
