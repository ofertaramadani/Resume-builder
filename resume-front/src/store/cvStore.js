import { defineStore } from "pinia";
import api from "@/api/api";

export const useResumeStore = defineStore("resume", {
  state: () => ({
    resumes: [],
    resumeToBeUpdated: null,
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
    newEducation: {
      title: "",
      school: "",
      place: "",
      start: "",
      end: "",
      description: "",
    },
    newExperience: {
      title: "",
      employer: "",
      place: "",
      start: "",
      end: "",
      description: "",
    },
  }),

  actions: {
    async createResume(resume) {
      try {
        this.addEducation();
        console.log("resume create", resume);
        return await api({ requiresAuth: true }).post("/cv", resume);
      } catch (error) {
        console.error("Errorj", error);
      }
    },
    async updateResume(resume) {
      try {
        this.addEducation();
        console.log("resume update", resume);
        const cvId = this.currentResume.id;
        let res = await api({ requiresAuth: true }).put(`/cv/${cvId}`, resume);
        console.log("On update response:", res);
      } catch (error) {
        console.error(error);
      }
    },
    async getResumes() {
      try {
        const resumes = await api({ requiresAuth: true }).get("/cv");
        console.log("rrrs", resumes);
        this.resumes = resumes.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getResume(id) {
      try {
        const resume = await api({ requiresAuth: true }).get(`/cv/${id}`);
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
        return sk.name !== skill.name;
      });
    },
    removeSocial(social) {
      console.log(social, "social");
      this.currentResume.socials = this.currentResume.socials.filter((sc) => {
        return sc.name !== social.name;
      });
      console.log("this.currentResume", this.currentResume);
    },
    addEducation() {
      if (!(Object.keys(this.newEducation).length === 0)) {
        console.log("education added");
        this.currentResume.educations.push(this.newEducation);
        this.setDefaultEducation();
      }
    },
    setDefaultEducation() {
      this.newEducation = {
        title: "",
        school: "",
        place: "",
        start: "",
        end: "",
        description: "",
      };
    },
    addExperience() {
      if (!(Object.keys(this.newExperience).length === 0)) {
        console.log("education added");
        this.currentResume.experiences.push(this.newExperience);
        this.setDefaultExperience();
      }
    },
    setDefaultExperience() {
      this.newExperience = {
        title: "",
        employer: "",
        place: "",
        start: "",
        end: "",
        description: "",
      };
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
