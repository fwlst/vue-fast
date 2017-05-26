<template>
    <div class="header">
        <div class="head_pic">
            <img :src="userInfo.head_pic">
        </div>
        <div class="head_info">
            <div class="info_left">
                <div class="nickname">{{userInfo.nickname}}</div>
                <div class="info_group">
                    <div class="balance">余额：{{userInfo.balance}}元</div>
                    <div class="integral">积分：{{userInfo.integral}}</div>
                </div>
            </div>
            <div class="info_right">
                <div class="city">
                    <span class="icon-location"></span>{{userInfo.city}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import API from '@/API/axios'
    export default {
        name: '',
        data () {
            return {
                userInfo: {}
            }
        },
        methods: {
            getUserInfo(){
                API.getUserInfo().then(({data})=>{
                    if(data.code == 200){
                        this.userInfo = data.data;
                    }else {
                        this.$toast(data.msg);
                    }
                })
            }
        },
        mounted () { // 代替ready
            this.getUserInfo()
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less" scoped>
    .header{
        background: #ffdc00;
        padding: 15px 10px;
        height: 60px;
        display: flex;
        .head_pic{
            flex: 60px 0 0;
            img{
                width: 100%;
                display: block;
                border-radius: 100%;
            }
        }
        .head_info{
            flex: 1;
            display: flex;
            .info_left{
                flex: 1;
                padding: 8px 0 8px 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .nickname{
                    font-weight: bold;
                }
                .info_group{
                    font-size: 14px;
                    font-weight: bold;
                    display: flex;
                    justify-content: space-between;
                    .balance{
                        width: 53%;
                    }
                    .integral{
                        width: 45%;
                    }
                }
            }
            .info_right{
                flex: 70px 0 0;
                font-size: 14px;
                font-weight: bold;
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
                padding-bottom: 8px;
            }
        }
    }
</style>
