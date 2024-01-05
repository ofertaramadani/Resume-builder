<template>
  <navbarElement v-if="1==2" />
  <router-view />
</template>

<script>
import navbarElement from './components/navbar/navbarElement.vue'
export default {
  name: 'App',
  components: {
    navbarElement
  }
}
</script>

<style lang="scss">
@import './assets/scss/index.scss';
.container {
    margin: 0 auto;
    max-width: $container;
    width: 100%;
}
.routerLink{
    text-decoration: none;
}
</style>
