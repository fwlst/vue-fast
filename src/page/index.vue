<template>
    <section class="index">
        <v-header></v-header>
        <restaurantList></restaurantList>
        <!--<h3 class="title">首页</h3>
        <mt-button class="login_btn" type="primary" size="large" @click="loginOut"><span class="icon-location"></span>登出</mt-button>
    -->
    </section>
</template>

<script>
    import API from '../API/axios'
    import header from '../components/index/header.vue'
    import restaurantList from '../components/index/restaurantList.vue'
    export default {
        name: '',
        data () {
            return {
                users: []
            }
        },
        methods: {
            loginOut(){
                let data = {
                    token: localStorage.getItem('token')
                }
                API.AddRestaurantInfo().then(({data})=>{
                    if(data.code == 200){
                        /*localStorage.setItem('token',data.token);
                        this.$router.push({
                            name: 'Index'
                        });*/
                    }else {
                        this.$toast(data.msg);
                    }
                })
            },
        },
        components: {
            'v-header': header,
            restaurantList
        },
        mounted () { // 代替ready

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less" scoped>
    .index{
        .title{
            font-size: 30px;
            color: #bd00ff;
            text-align: center;
            margin: 30px 0;
        }
        .form{
            margin-bottom: 30px;
        }
        .login_btn{
            width: 90%;
            margin: 0 auto;
            border-radius: 20px;
            background: #bd00ff;
        }
        .to_register{
            font-size: 12px;
            text-align: center;
            margin-top: 30px;
            color: #999;
        }
    }
</style>
