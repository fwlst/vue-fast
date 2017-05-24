/**
 * Created by lstfw on 2017/4/24.
 */
import Vuex from 'vuex'
import Vue from 'vue'

import indexData from '@/store/modules/index'
import goodsData from '@/store/modules/goods'
import goodListData from '@/store/modules/goodList'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        indexData,
        goodsData,
        goodListData
    }
});
