import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import landingPage from '../views/landingPage'
import App from '../App.vue'; 


const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: landingPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

const app = createApp(App);
app.use(router);
app.mount('#app');

export default router;
