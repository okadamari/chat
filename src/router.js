import { createWebHistory, createRouter } from "vue-router";
import Chat from '@/components/Chat'
import Login from '@/components/Login'

const routes = [
  {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    }
  ]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router