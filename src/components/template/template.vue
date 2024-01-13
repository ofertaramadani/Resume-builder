<template>
    <div class="template">
        <div class="template-side">
            <div class="template-side__personal">
                <div class="template-side__info template-side__info-profile">
                    <div class="template-side__info-img">
                        <img :src="personalDetailsStore.userPhoto" alt="User Photo">
                    </div>
                </div>
                <div class="template-side__info-title">
                    <h2>Contact</h2>
                    <div class="line"></div>
                    <div class="template-side__info">
                        <img src="../../assets/icons/email-icon.svg" alt="">
                        <p>{{ personalDetailsStore.userEmail }}</p>
                    </div>
                    <div class="template-side__info">
                        <img src="../../assets/icons/phone-icon.svg" alt="">
                        <p>{{ personalDetailsStore.userPhone }}</p>
                    </div>
                    <div class="template-side__info">
                        <img src="../../assets/icons/place-icon.svg" alt="">
                        <p>{{ personalDetailsStore.userCountry }}</p>
                    </div>
                </div>
                <div class="template-side__info-title">
                    <h2>Socials</h2>
                    <div class="line"></div>
                    <div class="template-side__info">
                        <ul>
                            <li><p>link</p></li>
                            <li><p>link</p></li>
                            <li><p>link</p></li>
                            <li><p>link</p></li>
                        </ul>
                    </div>
                </div>
                <div class="template-side__info-title">
                    <h2>Skills</h2>
                    <div class="line"></div>
                    <div class="template-side__info">
                        <ul>
                            <li><p>Skill</p></li>
                            <li><p>Skill</p></li>
                            <li><p>Skill</p></li>
                            <li><p>Skill</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="template-info">
            <div class="template-info__wrap">
                <div class="template-info__title">
                    <h1>{{ personalDetailsStore.userFirstname }} {{  personalDetailsStore.userLastname }}</h1>
                    <h2>{{ personalDetailsStore.userTitle }}</h2>
                </div>
                <div class="template-info__summary">
                    <h2>Professional Summary</h2>
                    <div class="line"></div>
                    <p>Hellooooooo kosoocoooo</p>
                </div>
                <div class="template-info__summary">
                    <h2>Education</h2>
                    <div class="line"></div>
                    <div class="template-info__education">
                        <div class="template-info__education-wrap">
                            <h4>2019-2022</h4>
                            <h3>School name</h3>
                            <h2>Title</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, iure?</p>
                        </div>
                    </div>
                </div>
                <div class="template-info__summary">
                    <h2>Experience</h2>
                    <div class="line"></div>
                    <div class="template-info__education">
                        <div class="template-info__education-wrap">
                            <h4>2019-2022</h4>
                            <h3>Workplace name</h3>
                            <h2>Title</h2>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident, iure?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { usePersonalDetailsStore } from '@/store/personalDetailsStore';
const personalDetailsStore = usePersonalDetailsStore();


</script>

<style lang="scss" scoped>
@import '../template/template.scss';
</style>