import { defineStore } from 'pinia';

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
