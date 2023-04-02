import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from "../views/Layout.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component:Layout,
    children:[
      {
        path: 'log',
        name: 'LogBrowse',
        component: () => import('../views/vLogBrowse.vue')
      },
      {
        path: 'seting',
        name: 'Seting',
        component: () => import('../views/Seting.vue')
      }

],

  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
