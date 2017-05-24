/**
 * Created by lstfw on 2017/5/11.
 */
import $http from 'axios'
import _ from 'lodash'

const OK_code = 200;
/*声明数据*/
const state = {
    postPrizesData: {},
    goodsData: {},
    orderInfoData: {}
};

/*同步更新store*/
const mutations = {
    updateGoodsData (state,payload){
        state.goodsData = payload;
    },
    updatePostPrizesData (state,payload){
        let val = _.defaults(payload,state.postPrizesData);
        state.postPrizesData = val;
    },
    updateOrderInfoData (state,payload){
        state.orderInfoData = payload;
    },
};

/*异步更新store*/
const actions = {
    fatchGoodsData ({commit,state}){
        return new Promise((resolve,reject) => {
            $http.post('/prizes', state.postPrizesData).then((res) => {
                let code = res.data.code;
                if(code == OK_code){
                    let data = res.data.data.prizes;
                    let prizeId = data[0].prizeId;
                    commit('updatePostPrizesData',{prizeId:prizeId});
                    commit('updateGoodsData',data);
                    resolve(data);
                }else {
                    reject(res.data);
                }
            }, (err) => {

            })
        });
    },
    fatchSendCode ({commit,state}){
        return new Promise((resolve,reject) => {
            $http.post('/sendCode', state.postPrizesData).then((res) => {
                let code = res.data.code;
                if(code == OK_code){
                    let data = res.data.data;
                    commit('updateOrderInfoData',data);
                    resolve(data);
                }else {
                    reject(res.data);
                }
            }, (err) => {

            })
        });
    },
    fatchOrderInfoData ({commit,state}){
        return new Promise((resolve,reject) => {
            $http.post('/toBuy', state.postPrizesData).then((res) => {
                let code = res.data.code;
                if(code == OK_code){
                    let data = res.data.data.order;
                    commit('updateOrderInfoData',data);
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
    getPostPrizesData: state => state.postPrizesData,
    getGoodsData: state => state.goodsData,
    getOrderInfoData: state => state.orderInfoData,
};
export default {
    state,
    mutations,
    actions,
    getters
}
