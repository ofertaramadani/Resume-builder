import { defineStore } from 'pinia';
import api from "@/api/api";

export const useTemplatesStore = defineStore('templates', {
  state: () => ({
    templates:[],
  }),

  actions: {
    async getTemplates(){
      try {
        const templates =  await api({ requiresAuth: true }).get(
          "/templates"
        );
        this.templates = templates;
      } catch (error) {
        console.error(
          error
        );
      }

    },
  }
});
