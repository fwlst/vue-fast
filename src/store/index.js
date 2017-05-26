/**
 * Created by lstfw on 2017/4/24.
 */
import Vuex from 'vuex'
import Vue from 'vue'

import indexData from '@/store/modules/index'
import login from '@/store/modules/login'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        indexData,
        login
    }
});
