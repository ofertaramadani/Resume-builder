import api from "@/api/api";
import router from "@/router";
import { defineStore } from "pinia";
 
export const auth = defineStore("auth", {
  state: () => ({
  }),
 
  actions: {
    setUserToken(token){
        localStorage.setItem('accessToken', token);
    },
    async login(credentials) {
      try {
        const res = await api({ requiresAuth: false }).post(
          "/auth/login",
          credentials
        );
        this.setUserToken(res.data.accessToken)
      } catch (error) {
        console.error(
          "LOGIN ER                                                                                                  ROR:",
          error.response.data.message
        );
      }
    },
    async register(credentials) {
        try {
          const res = await api({ requiresAuth: false }).post(
            "/auth/register",
            credentials
          );
          this.setUserToken(res.data.accessToken)
        } catch (error) {
          console.error(
            error
          );
        }
      },
    logout(){
        localStorage.removeItem('accessToken')
        router.push('/login')
    }
  },
});