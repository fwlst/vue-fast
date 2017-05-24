/**
 * Created by lstfw on 2017/5/18.
 */
import $http from 'axios';
import _ from 'lodash'

/*状态码*/
const OK_code = 200;


/*声明数据*/
const state = {
    goodListPostData: {
        weappNo: 'wifi_mp_pay_wechat'
    },
    wxPayData: {}
};

/*同步更新store*/
const mutations = {
    updateGoodListPostData (state,payload){
        let val = _.defaults(payload,state.goodListPostData);
        state.goodListPostData = val;
    },
    updateWxPayData (state,payload){
        state.wxPayData = payload;
    },
};

/*异步更新store*/
const actions = {
    fatchGoodListData ({commit,state}){
        return new Promise((resolve,reject) => {
            $http.post('/confirmPayment', state.goodListPostData).then((res) => {
                if(res.data.code == OK_code){
                    let data = res.data.data;
                    commit('updateWxPayData',data);
                    resolve(data);
                }else {
                    reject(res.data);
                }
            }, (err) => {

            })
        });
    },
    fatchSuccessCallback ({commit,state}){
        return new Promise((resolve,reject) => {
            $http.post('/callback', state.goodListPostData).then((res) => {
                if(res.data.code == OK_code){
                    resolve(data);
                }else {
                    reject(res.data);
                }
            }, (err) => {

            })
        });
    }
};

/**/
const getters = {
    getGoodListPostData: state => state.goodListPostData,
    getWxPayData: state => state.wxPayData
};
export default {
    state,
    mutations,
    actions,
    getters
}
