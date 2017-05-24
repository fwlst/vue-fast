/**
 * Created by lstfw on 2017/4/24.
 */
import $http from 'axios';
    /*状态码*/
const OK_code = 200;


/*声明数据*/
const state = {
    indexPostData: {
        activityId: '81b6e88c-17e2-478a-9a2d-0024fdbf3b19',
        openid: ''
    },
    activityData: {}
};

/*同步更新store*/
const mutations = {
    updatePostData (state,{key,val}){
        state.indexPostData[key] = val;
    },
    updateActivityData (state,payload){
        state.activityData = payload;
    },
};

/*异步更新store*/
const actions = {
    fatchActivityData ({commit,state}){
        return new Promise((resolve,reject) => {
            $http.post('/activity', state.indexPostData).then((res) => {
                if(res.data.code == OK_code){
                    let data = res.data.data;
                    let activityNewData = {};
                    activityNewData.activityStatus = data.activityStatus;
                    activityNewData.orderPayment = data.orderPayment;
                    activityNewData.remark = data.remark;
                    activityNewData.titlePic = data.titlePic;
                    activityNewData.itemData = [];
                    let key = ['参与人数','目标人数','进度','参与时间'];
                    let val = [data.registerNum,data.targetCount,data.progressNum + '%',data.remainingTime];
                    key.forEach(function (v,i) {
                        let itemDataObj = {
                            title: key[i],
                            val: val[i]
                        };
                        activityNewData.itemData.push(itemDataObj);
                    });
                    commit('updateActivityData',activityNewData);
                    resolve(activityNewData);
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
    getPostData: state => state.indexPostData,
    getActivityData: state => state.activityData
};
export default {
    state,
    mutations,
    actions,
    getters
}
