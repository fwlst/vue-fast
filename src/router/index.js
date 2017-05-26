import Vue from 'vue'
import Router from 'vue-router'


import Login from '../page/login'
import Register from '../page/register'
import Index from '../page/index'
import Err from '../page/err'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        }, {
            path: '/register',
            name: 'Register',
            component: Register
        }, {
            path: '/index',
            name: 'Index',
            component: Index,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
        }, {
            path: '/*',
            name: 'Err',
            component: Err
        }
    ]
})
