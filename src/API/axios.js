import $http from 'axios'
import { Indicator } from 'mint-ui';

$http.default.timeout = 5000;
$http.defaults.headers.post['Content-Type'] = 'application/json'

const instance = $http.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'

$http.interceptors.request.use = instance.interceptors.request.use


instance.interceptors.request.use(config => {
    Indicator.open({
        spinnerType: 'fading-circle'
    });
	if(localStorage.getItem('token')) {
		config.headers.Authorization = `token ${localStorage.getItem('token')}`.replace(/(^\")|(\"$)/g, '')
	}
	return config
}, err => {
    Indicator.open({
        spinnerType: 'fading-circle'
    });
	return Promise.reject(err)
})
// axios拦截响应
instance.interceptors.response.use(response => {
    Indicator.close();
	return response
}, err => {
    Indicator.close();
    if (err.response) {
        console.log(err.response)
        switch (err.response.status) {
            case 401:
                // 401 清除token信息并跳转到登录页面
                //store.commit(types.LOGOUT);
                //router.replace({
                //    path: 'login',
                //    query: {redirect: router.currentRoute.fullPath}
                //})
        }
    }
	return Promise.reject(err)
})

export default {
	// 用户注册
	userRegister(data) {
		return instance.post('/api/register', data)
	},
	// 用户登录
	userLogin(data) {
		return instance.post('/api/login', data)
	},
	// 获取用户
	getUser() {
		return instance.get('/api/user')
	},
    // 获取用户信息
    getUserInfo(data) {
        return instance.post('/api/userInfo',data)
    },
	// 删除用户
	delUser(data) {
		return instance.post('/api/delUser', data)
	},
    // 添加商户信息
    addRestaurantInfo(data) {
        return instance.post('/api/restaurantInfo', data)
    },
    // 添加商户信息
    getRestaurantInfo(data) {
        return instance.post('/api/getRestaurant', data)
    }
}
