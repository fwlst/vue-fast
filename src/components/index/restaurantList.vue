<template>
    <div class="nearby">
        <h3 class="nearby_title">附近的餐厅</h3>
        <ul class="restaurant_list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li class="item" v-for="(item,index) in restaurantListData" @click="gouTo(index)">
                <div class="restaurant_pic">
                    <img :src="item.restaurantPic">
                </div>
                <div class="restaurant_info">
                    <div class="info_left">
                        <div class="restaurant_name">{{item.restaurantName}}</div>
                        <div class="wait">
                            <div class="vacancy"><span class="kong">空</span>{{item.vacancy}}</div>
                            <div class="distance">{{item.distance}}</div>
                        </div>
                        <div class="distributionTime" v-show="item.distributionTime != ''">平均配餐时间为{{item.distributionTime}}分钟</div>
                    </div>
                    <div class="info_right">
                        <span class="icon-heart collect" ></span>
                        <div class="restaurant_type" v-show="item.restaurantType != ''">{{item.restaurantType}}</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>

</template>

<script>
    import API from '@/API/axios';
    import { InfiniteScroll } from 'mint-ui';
    export default {
        name: '',
        data () {
            return {
                restaurantListData : []
            }
        },
        methods: {
            getRestaurantInfo(){
                API.getRestaurantInfo().then(({data})=>{
                    if(data.code == 200){
                        this.restaurantListData = this.restaurantListData.concat(data.data);
                    }else {
                        this.$toast(data.msg);
                    }
                })
            },
            loadMore() {
                this.getRestaurantInfo();
            }
        },
        mounted () { // 代替ready
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less" scoped>
    .nearby{
        border-top: 8px solid #e4e4e4;
        .nearby_title{
            padding: 15px 0 5px 10px;
            font-weight: bold;
        }
        .restaurant_list{

            .item{
                padding: 10px;
                border-top: 1px solid #e4e4e4;
                display: flex;
                &:first-child{
                    border-top: none;
                }
                .restaurant_pic{
                    flex: 70px 0 0;
                    img{
                        display: block;
                        width: 100%;
                    }
                }
                .restaurant_info{
                    display: flex;
                    flex: 1;
                    padding-left: 15px;
                    .info_left{
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        flex-wrap: wrap;
                        align-content: space-between;
                        .restaurant_name{
                            flex: 25px 0 0;
                            font-weight: 500;
                        }
                        .wait{
                            flex: 25px 0 0;
                            display: flex;
                            font-size: 12px;
                            height: 25px;
                            line-height: 25px;
                            .vacancy{
                                flex: 1;
                                .kong{
                                    margin-right: 5px;
                                    display: inline-block;
                                    width: 20px;
                                    height: 20px;
                                    line-height: 20px;
                                    border-radius: 100%;
                                    text-align: center;
                                    color: #ff4a40;
                                    border: 1px solid #ff4a40;
                                }
                            }
                            .distance{
                                flex: 1;
                                color: #7e8c8d;
                            }
                        }
                        .distributionTime{
                            flex: 1;
                            font-size: 12px;
                            color: #8f8f8f;
                            line-height: 20px;
                        }
                    }
                    .info_right{
                        flex: 70px 0 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: flex-end;
                        .collect{
                            color: #dcdcdc;
                            &.active{
                                color: #ffdc00;
                            }
                        }
                        .restaurant_type{
                            padding: 0 10px;
                            font-size: 12px;
                            background: #ffdc00;
                            text-align: center;
                            height: 25px;
                            line-height: 25px;
                            border-radius: 5px;
                        }
                    }
                }
            }
        }
    }
</style>
