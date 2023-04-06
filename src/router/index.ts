import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Layout from "@/views/Layout.vue"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
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

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: 'body', //指定进度条的父容器
})

// 每次跳转页面前显示进度条
router.beforeEach((to, from, next) => {
    //  避免进入不存在的路由 导致 白屏
    if (to.matched.length ===0) {  //如果未匹配到路由
        from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    } else {
        next();    //如果匹配到正确跳转
    }


    //全局进度条的配置
  NProgress.configure({
    easing: "ease", // 动画方式
    speed: 1000, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 更改启动时使用的最小百分比
    parent: "body", //指定进度条的父容器
  })
  NProgress.start()
  next()
})

// 路由加载后隐藏进度条
router.afterEach(() => {
  NProgress.done()
})


router.beforeEach((pre, next) => {

})

router.afterEach(() => {

})




export default router
