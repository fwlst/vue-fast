/*声明数据*/
const state = {
    token: localStorage.getItem('token')
};

/*同步更新store*/
const mutations = {
    updateToken (state,payload){
        localStorage.setItem('token',payload);
        state.token = payload;
    },
    delToken (state,payload){
        localStorage.removeItem('token');
        state.token = payload;
    },
};

/*异步更新store*/
const actions = {
    setToken ({commit,state}){

    }
};

export default {
    state,
    mutations,
}
