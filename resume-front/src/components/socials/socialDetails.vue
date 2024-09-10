<template>
  <div class="socials">
    <div class="socials__default">
      <div
        class="socials__social"
        v-for="(link, index) in links"
        :key="index"
        @click="removeSocial(link, index)"
      >
        <p>{{ link.name }}</p>
      </div>
    </div>
    <div class="socials__add">
      <div class="socials__add-input">
        <input
          type="text"
          placeholder="Add a new social"
          v-model="socialLink"
        />
      </div>
      <div class="socials__add-social" @click="addSocial()">
        <img src="../../assets/icons/black-plus.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import { useResumeStore } from "@/store/cvStore";

const resumeStore = useResumeStore();
const socialLink = ref("");
let links = reactive([]);

const addSocial = () => {
  if (socialLink.value !== "") {
    resumeStore.addSocial({ name: socialLink.value });
    socialLink.value = "";
  }
};
const removeSocial = (social, index) => {
  resumeStore.removeSocial(social.name);
  links.splice(index, 1);
};

onBeforeMount(() => {
  links = resumeStore.currentResume.socials;
});
</script>

<style lang="scss" scoped>
@import "./socialDetails.scss";
</style>
