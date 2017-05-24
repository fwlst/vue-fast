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
            name: 'Register',
            component: Register
        }, {
            path: '/login',
            name: 'Login',
            component: Login
        }, {
            path: '/index',
            name: 'Index',
            component: Index
        }, {
            path: '/*',
            name: 'Err',
            component: Err
        }
    ]
})
