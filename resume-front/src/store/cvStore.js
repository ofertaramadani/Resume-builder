import { defineStore } from "pinia";
import api from "@/api/api";
import { useToast } from "vue-toastification";

const toast = useToast();
export const useResumeStore = defineStore("resume", {
  state: () => ({
    resumes: [],
    resumeToBeUpdated: null,
    imageToBeUploaded: null,
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
          start: "2015-07-06",
          end: "2019-07-06",
          school: "University of Sample",
          place: "Sample City",
          title: "Bachelor of Science in Computer Science",
          description:
            "Graduated with honors, focusing on software development and data structures.",
        },
      ],
      experiences: [
        {
          start: "2020-08-08",
          end: "2022-09-08",
          employer: "Tech Corp",
          place: "Sample City",
          title: "Frontend Developer",
          description:
            "Developed user interfaces using Vue.js and maintained application performance.",
        },
        {
          start: "2022-08-08",
          end: "2023-09-09",
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
        let res = await api({ requiresAuth: true }).post("/cv", resume);
        this.currentResume.id = res.data.id;
        await this.uploadImage();
        toast.success("Resume created successfully!");
      } catch (error) {
        toast.error("Could not create resume, try again!");
        console.error("Error", error);
      }
    },
    async updateResume(resume) {
      try {
        this.addEducation();
        this.addExperience();
        this.uploadImage();
        const cvId = this.currentResume.id;
        await api({ requiresAuth: true }).put(`/cv/${cvId}`, resume);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteResume(id) {
      try {
        await api({ requiresAuth: true }).delete(`/cv/${id}`);
        this.removeResume(id);
        toast.success("Resume deleted successfully!");
      } catch (error) {
        toast.error("Could not delete resume!");
        console.error(error);
      }
    },
    removeResume(id) {
      this.resumes = this.resumes.filter((resume) => resume.id !== id);
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
        return sk.name !== skill;
      });
    },
    removeSocial(social) {
      this.currentResume.socials = this.currentResume.socials.filter((sc) => {
        return sc.name !== social;
      });
    },
    addEducation() {
      const hasNonEmptyValue = Object.values(this.newEducation).some(
        (value) => value !== ""
      );

      if (hasNonEmptyValue) {
        this.currentResume.educations.push({ ...this.newEducation });
        this.setDefaultEducation();
      }
    },
    setDefaultEducation() {
      this.newEducation.title = "";
      this.newEducation.school = "";
      this.newEducation.place = "";
      this.newEducation.start = "";
      this.newEducation.end = "";
      this.newEducation.description = "";
    },
    addExperience() {
      const hasNonEmptyValue = Object.values(this.newExperience).some(
        (value) => value !== ""
      );

      if (hasNonEmptyValue) {
        this.currentResume.experiences.push({ ...this.newExperience });
        this.setDefaultExperience();
      }
    },
    setDefaultExperience() {
      this.newExperience.title = "";
      this.newExperience.employer = "";
      this.newExperience.place = "";
      this.newExperience.start = "";
      this.newExperience.end = "";
      this.newExperience.description = "";
    },
    addSkill(skill) {
      this.currentResume.skills.push(skill);
    },
    addSocial(social) {
      this.currentResume.socials.push(social);
    },
    async getAiSkills(jobDescription) {
      try {
        await api({ requiresAuth: true }).post("/skill/extract", {
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
        return true;
      }
    },
    addImageToCv(file) {
      const formData = new FormData();
      formData.append("photo", file);
      this.imageToBeUploaded = formData;
    },
    async uploadImage() {
      try {
        const cvId = this.currentResume.id;
        const response = await api({ requiresAuth: true }).post(
          `/cv/${cvId}/upload-image`,
          this.imageToBeUploaded
        );
        this.currentResume.photo = response.data.photoUrl;
      } catch (error) {
        console.error(error);
      }
    },
    async removeImage() {
      try {
        const cvId = this.currentResume.id;
        await api({ requiresAuth: true }).delete(`/cv/${cvId}/image`);
        this.currentResume.photo = null;
        toast.success("Image removed successfully!");
      } catch (error) {
        toast.error("Image removing failed!");
        console.error(error);
      }
    },
    async suggest() {
      try {
        let res = await api({ requiresAuth: true }).post(`/cv/suggest`, {
          profession: "Programmer",
        });
        console.log("suggested skills", res);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
