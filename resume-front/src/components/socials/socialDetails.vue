<template>
    <div class="socials">
        <div class="socials__default">
            <div class="socials__social" v-for="(link, index) in links" :key="index"><a href="#">{{ link }}</a></div>
        </div>
        <div class="socials__add">
            <div class="socials__add-input">
                <input type="text" placeholder="Add a new social" v-model="socialLink"/>
            </div>
            <div class="socials__add-social" @click="addSocial()">
                <img src="../../assets/icons/black-plus.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSocialsStore } from '@/store/socailsStore';
const socialsStore = useSocialsStore();
const links = ref([]);
const socialLink = ref('');
const addSocial=()=> {
    if(socialLink.value !== '') {
    socialsStore.addSocial({name:socialLink.value})
    links.value.push(socialLink.value)
    socialLink.value = ''
    }
}

</script>


<style lang="scss" scoped>
@import './socialDetails.scss';
</style>