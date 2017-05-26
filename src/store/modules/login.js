/*声明数据*/
const state = {
    token: null
};

/*同步更新store*/
const mutations = {
    updateToken (state,payload){
        localStorage.setItem('token',payload);
        state.token = payload;
    }
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
