import { defineStore } from 'pinia';
import api from "@/api/api";

export const usePersonalDetailsStore = defineStore('personalDetails', {
  state: () => ({
    userTitle: '',
    userPhoto: '',
    userFirstname: '',
    userLastname: '',
    userEmail: '',
    userPhone: '',
    userCountry: '',
    userCity: '',
  }),

  actions: {
    async getPersonalData(){
      try {
        return await api({ requiresAuth: true }).get(
          "/personal-details"
        );
      }
      catch(error){
        console.error(error)
      }
    },
    setUserTitle(title) {
      this.userTitle = title;
    },
    setUserPhoto(photo) {
      this.userPhoto = photo;
    },
    setUserFirstname(firstName) {
      this.userFirstname = firstName;
    },
    setUserLastname(lastName) {
      this.userLastname = lastName;
    },
    setUserEmail(email) {
      this.userEmail = email;
    },
    setUserPhone(phone) {
      this.userPhone = phone;
    },
    setUserCountry(country) {
      this.userCountry = country;
    },
    setUserCity(city) {
      this.userCity = city;
    },
  },
});
