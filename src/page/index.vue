<template>
    <section class="index">
        <h3 class="title">首页</h3>
        <mt-button class="login_btn" type="primary" size="large" @click="loginOut">登出</mt-button>
        <ul>
            <li v-for="(user,index) in users">{{user.userName}}</li>
        </ul>
    </section>
</template>

<script>
    import API from '../API/axios'
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
                API.getUser().then(({data})=>{
                    if(data.code == 200){
                        this.users = data.data;
                        console.log(data,this.users)
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
