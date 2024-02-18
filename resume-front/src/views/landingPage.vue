<template>
    <div class="wrapper">
        <div class="home container">
            <section class="home__hero">
                <div class="home__hero-info">
                    <h1>Create your own portofolio</h1>
                    <p>Our perfect resume builder takes things on another level. Choose a template and start giving your informations to fill the fields.</p>
                    <div class="home__hero-btn">
                     <buttonElement>Choose A Template</buttonElement>
                </div>
                </div>
                <div class="home__hero-img">
                     <img src="../assets/images/banner2.png" alt="">
                </div>
            </section> 
        </div>
    </div>
    <section class="qualities__wrapper">
        <div class="container">
                <div class="qualities">
                <div class="qualities__left">
                    <img src="../assets/images/2.jpg" alt="">
                </div>
                <div class="qualities__right">
                    <h2>Why you should choose us</h2>
                    <h5>Free of charge</h5>
                    <h5>Creative Templates Design</h5>
                    <h5>User friendly and Intuitive Online Resume Builder</h5>
                    <h5>CV Templates to increase Hiring Chance</h5>
                </div>
            </div>
        </div>
    </section>
    <section class="templates__wrapper">
        <div class="container">
            <div class="templates">
                <h2 class="templates__title">
                    Recent templates
                </h2>
                <p class="templates__text">Here a 3 most recent templates that can boost your hiring rates</p>
                <div class="templates__group">
                    <div class="templates__single">
                        <img src="../assets/images/2.jpg" alt="">
                        <buttonElement class="btn__template">Use Template</buttonElement>
                    </div>
                    <div class="templates__single"><img src="../assets/images/2.jpg" alt="">
                        <buttonElement class="btn__template">Use Template</buttonElement></div>
                    <div class="templates__single"><img src="../assets/images/2.jpg" alt="">
                        <buttonElement class="btn__template">Use Template</buttonElement></div>
                </div>
            </div>
        </div>
    </section>
    
</template>
<script setup>
import buttonElement from '../components/button/buttonElement.vue';
</script>

<style lang="scss" scoped>
@import '../assets/scss/index.scss';
@import '../assets/scss/pages/landingPage.scss';
</style>