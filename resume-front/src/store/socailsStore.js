import { defineStore } from 'pinia';

export const useSocialsStore = defineStore('socials', {
    state:()=>({
        socials:[],
    }),
    actions: {
        addSocial(social) {
            this.socials.push(social);
        },
    },
})

