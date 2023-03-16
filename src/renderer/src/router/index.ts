import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'tools',
      component: () => import('../views/tools.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('../views/video/video.vue')
    },
    {
      path: '/screen',
      name: 'screen',
      component: () => import('../views/screen/screen.vue')
    }
  ]
})

export default router
