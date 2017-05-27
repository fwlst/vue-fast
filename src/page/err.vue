<template>
    <section class="err">
        <div class="err_box">
            <img class="err_pic" src="../assets/img/err.jpg">
            <router-link tag="div" to="/" class="back_home">返回主页</router-link>
        </div>
    </section>
</template>

<script>
    export default {
        methods: {
            setErrHeight(){
                let $err = document.getElementsByClassName('err');
                $err[0].style.height = window.screen.height + 'px';
                console.log($err,window.screen.height)
            }
        },
        mounted () { // 代替ready
            this.setErrHeight()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less" scoped>
    .err{
        display: flex;
        align-items: center;
        .err_box{
            flex: 1;
            .err_pic{
                display: block;
                width: 100%;
            }
            .back_home{
                margin: 30px auto 0;
                width: 30%;
                background: #bd00ff;
                color: #fff;
                text-align: center;
                padding: 10px;
                border-radius: 50px;
            }
        }
    }
</style>
