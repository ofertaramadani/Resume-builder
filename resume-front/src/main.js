import { createApp } from 'vue';
import { createPinia } from 'pinia' 
import App from './App.vue';
import router from './router';
import VueHtml2pdf from 'vue3-html2pdf'


const pinia = createPinia()
const app = createApp(App);
app.provide('router', router);
app.use(VueHtml2pdf);
app.use(router);
app.use(pinia);
app.mount('#app');
