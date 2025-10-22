import { createRouter, createWebHistory } from 'vue-router'

import AdminLayout from '@/layouts/AdminLayout.vue'

import Login from '@/views/Login.vue'
import HomeView from '@/views/HomeView.vue'
import Dashboard from '@/views/Dashboard.vue'

import RoomIndex from '@/views/room/RoomIndex.vue'
import RoomCreate from '@/views/room/RoomCreate.vue'
import RoomEdit from '@/views/room/RoomEdit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      { path: 'room', name: 'RoomIndex', component: RoomIndex },
      { path: 'room/create', name: 'RoomCreate', component: RoomCreate },
      { path: 'room/edit', name: 'RoomEdit', component: RoomEdit },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'bg-neutral-400 font-semibold text-white',
  linkExactActiveClass: 'bg-neutarl-400 font-semibold text-white',
})

export default router
