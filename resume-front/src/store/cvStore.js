import { defineStore } from "pinia";
import api from "@/api/api";

export const useResumeStore = defineStore("resume", {
  state: () => ({
    resumes: [],
    resumeToBeUpdated: null,
    dummyObject: {
      photo: "https://via.placeholder.com/150",
      email: "example@example.com",
      phone: "+1234567890",
      city: "Sample City",
      country: "Sample Country",
      firstname: "John",
      lastname: "Doe",
      title: "Software Engineer",
      professionalSummary:
        "Experienced software engineer with a demonstrated history of working in the tech industry. Skilled in various programming languages and frameworks.",
      socials: [
        { name: "https://linkedin.com" },
        { name: "https://github.com" },
        { name: "https://twitter.com" },
      ],
      skills: [{ name: "JavaScript" }, { name: "Vue.js" }, { name: "Node.js" }],
      educations: [
        {
          start: "2015",
          end: "2019",
          school: "University of Sample",
          place: "Sample City",
          title: "Bachelor of Science in Computer Science",
          description:
            "Graduated with honors, focusing on software development and data structures.",
        },
      ],
      experiences: [
        {
          start: "2020",
          end: "2022",
          employer: "Tech Corp",
          place: "Sample City",
          title: "Frontend Developer",
          description:
            "Developed user interfaces using Vue.js and maintained application performance.",
        },
        {
          start: "2022",
          end: "2023",
          employer: "Tech Corp",
          place: "Sample City",
          title: "Frontend Developer",
          description:
            "Developed user interfaces using Vue.js and maintained application performance.",
        },
      ],
    },
    currentResume: {
      photo: "",
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
        this.addExperience();
        return await api({ requiresAuth: true }).post("/cv", resume);
      } catch (error) {
        console.error("Errorj", error);
      }
    },
    async updateResume(resume) {
      try {
        this.addEducation();
        this.addExperience();
        const cvId = this.currentResume.id;
        return await api({ requiresAuth: true }).put(`/cv/${cvId}`, resume);
      } catch (error) {
        console.error(error);
      }
    },
    async getResumes() {
      try {
        const resumes = await api({ requiresAuth: true }).get("/cv");
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
      this.currentResume.socials = this.currentResume.socials.filter((sc) => {
        return sc.name !== social.name;
      });
    },
    addEducation() {
      const hasNonEmptyValue = Object.values(this.newEducation).some(
        (value) => value !== ""
      );

      if (hasNonEmptyValue) {
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
      const hasNonEmptyValue = Object.values(this.newExperience).some(
        (value) => value !== ""
      );

      if (hasNonEmptyValue) {
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
      } catch (error) {
        console.error(error);
      }
    },
    validateFields() {
      if (
        this.currentResume.firstname &&
        this.currentResume.lastname &&
        this.currentResume.title &&
        this.currentResume.email &&
        this.currentResume.phone &&
        this.currentResume.country &&
        this.currentResume.city &&
        this.currentResume.professionalSummary
      ) {
        console.log("urjok", this.currentResume);
        return true;
      }
    },
  },
});
