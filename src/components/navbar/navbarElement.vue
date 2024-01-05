<template>
    <div class="header">
        <div class="container">
           <div class="header__wrapper">
            <router-link to="/" class="routerLink"><h4 class="header__logo">resume.</h4></router-link>
           <div class="header__links">
               <nav class="header__nav">
                    <router-link to="/login" class="routerLink"><a href="" class="home__login">login</a></router-link>
                    <router-link to="/signup" class="routerLink"><a href="" class="home__signup">sign up</a></router-link>
                    <router-link to="/contact" class="routerLink"><a href="" class="home__contact">contact</a></router-link>
               </nav>
           </div>
        </div>
      </div>
    </div>
</template>
<script>
</script>
<style lang="scss" scoped>
@import '../../assets/scss/index.scss';
@import './navbar';
</style>