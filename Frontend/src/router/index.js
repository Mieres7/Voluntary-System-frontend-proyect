import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TaskView from '../views/TasksView.vue'
import interactiveView from '../views/InteractiveView.vue'
import EmergencysMapView from '../views/EmergencysMapView.vue'
import jwtDecode from "jwt-decode";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/task',
      name: 'task',
      component: TaskView
    },
    {
      path: '/interactive',
      name: 'interactive',
      component: interactiveView
    },
    {
      path: '/map',
      name: 'map',
      component: EmergencysMapView
    }

     
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    const decodedToken = jwtDecode(token);
    const tokenExpireTime = decodedToken.exp;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    if (to.matched.some(record => record.meta.requiresAuth) && (tokenExpireTime < currentTimeInSeconds)) {
      if (to.path !== '/') {
        next('/');
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    if (to.path !== '/') {
      next('/');
    } else {
      next();
    }
  }
});

export default router
