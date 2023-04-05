import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Layout from "@/views/Layout.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Layout,
        redirect: {path: 'chart'},
        children: [
            {
                path: 'log',
                name: 'LogBrowse',
                meta: {menu: "日志"},
                component: () => import('../views/LogBrowse.vue')
            },
            {
                path: 'seting',
                name: 'Seting',
                meta: {menu: "设置"},
                component: () => import('../views/Seting.vue')
            },
            {
                path: 'chart',
                name: 'Chart',
                meta: {menu: "报表"},
                component: () => import('../views/Chart.vue')
            }

        ],

    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
