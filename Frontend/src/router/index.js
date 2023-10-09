import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TaskView from '../views/TasksView.vue'
import interactiveView from '../views/InteractiveView.vue'


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
    }
     
  ]
})

export default router
