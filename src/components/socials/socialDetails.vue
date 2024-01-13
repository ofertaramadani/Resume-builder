<template>
    <div class="socials">
        <div class="socials__wrap" v-for="(link, index) in links" :key="index">
            <div class="socials__link"><a href="#">{{ link }}</a></div>
        </div>
        <div class="socials__add">
            <div class="socials__social socials__add-social" @click="addSocial()">
                <p>Add a social</p>
            </div>
            <div class="socials__add-input">
                <input type="text" placeholder="Add a new social" v-model="socialLink"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const links = ref([]);
const socialLink = ref('');
const addSocial=()=> {
    if(socialLink.value !== '') {
    links.value.push(socialLink.value)
    socialLink.value = ''
    }
}

</script>


<style lang="scss" scoped>
@import './socialDetails.scss';
</style>