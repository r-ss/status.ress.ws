import { createRouter, createWebHistory } from 'vue-router'
import Visual from '../views/Visual.vue'

const routes = [
  {
    name: 'visual',
    path: '/',
    component: Visual
  },
  {
    name: 'raw',
    path: '/raw',
    component: () => import('../views/Raw.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
