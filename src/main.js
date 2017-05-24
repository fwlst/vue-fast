// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import $http from 'axios';

/* reset import   全局引入重置样式 */
import '@/assets/css/reset.css';

/*引入 store*/
import store from '@/store'

/*引入 注冊 mint-ui*/
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

/*引入注册表单验证组件*/
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)


Vue.prototype.$http = $http;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    //template: '<App/>',
    //components: { App }
});
