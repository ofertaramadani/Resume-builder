<template>
  <navbarElement v-if="$route.path === '/' || $route.path === '/login' || $route.path === '/signup'" />
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
textarea, input {
  border-bottom: 1px solid #eff2f9 !important;
  border-radius: 5px;
}
textarea:focus, input:focus{
    outline: none;
    border-bottom: 1px solid #263fa1 !important;
}
</style>
