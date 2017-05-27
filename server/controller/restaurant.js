/**
 * Created by lstfw on 2017/5/25.
 */
const express = require('express');
const model = require('../db/db.js');
const router = express.Router();
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

const _ = require('lodash');

const code_Ok = 200;
const code_ERR = 600;

// 注册
const RestaurantInfo = (req, res) => {
    let RestaurantDataS = [
        {
            restaurantName: '四海一家',
            restaurantPic: 'assets/img/shyj.jpg',
            distributionTime:'10',
            distance: '15KM',
            vacancy: '15',
            collect: 1,
            restaurantType: '新店入住',
            address: '深圳市南山区益田假日广场',
            telephone: '0755-85642365'
        },{
            restaurantName: '屌丝烤鱼',
            restaurantPic: 'assets/img/shyj.jpg',
            distributionTime:'10',
            distance: '15KM',
            vacancy: '12',
            collect: 0,
            restaurantType: '新店入住',
            address: '深圳市宝安固戍二路',
            telephone: '0755-85642365'
        },{
            restaurantName: '冠菌自助火锅',
            restaurantPic: 'assets/img/shyj.jpg',
            distributionTime:'10',
            distance: '15KM',
            vacancy: '15',
            collect: 1,
            restaurantType: '新店入住',
            address: '深圳市南山区益田假日广场',
            telephone: '0755-85642365'
        },{
            restaurantName: '冠菌海鲜自助火锅',
            restaurantPic: 'assets/img/shyj.jpg',
            distributionTime:'10',
            distance: '15KM',
            vacancy: '15',
            collect: 1,
            restaurantType: '新店入住',
            address: '深圳市南山区益田假日广场',
            telephone: '0755-85642365'
        },{
            restaurantName: '美味园',
            restaurantPic: 'assets/img/shyj.jpg',
            distributionTime:'10',
            distance: '15KM',
            vacancy: '15',
            collect: 1,
            restaurantType: '新店入住',
            address: '深圳市南山区益田假日广场',
            telephone: '0755-85642365'
        },{
            restaurantName: '湖南蒸菜',
            restaurantPic: 'assets/img/shyj.jpg',
            distributionTime:'10',
            distance: '15KM',
            vacancy: '15',
            collect: 1,
            restaurantType: '新店入住',
            address: '深圳市南山区益田假日广场',
            telephone: '0755-85642365'
        },{
            restaurantName: '湖南大碗菜',
            restaurantPic: 'assets/img/shyj.jpg',
            distributionTime:'10',
            distance: '15KM',
            vacancy: '15',
            collect: 1,
            restaurantType: '新店入住',
            address: '深圳市南山区益田假日广场',
            telephone: '0755-85642365'
        },{
            restaurantName: '潮汕牛肉',
            restaurantPic: 'assets/img/shyj.jpg',
            distributionTime:'10',
            distance: '15KM',
            vacancy: '15',
            collect: 1,
            restaurantType: '新店入住',
            address: '深圳市南山区益田假日广场',
            telephone: '0755-85642365'
        }
    ];
    for (let i = 0; i < RestaurantDataS.length; i++){
        let RestaurantData = new model.Restaurant(RestaurantDataS[i]);
        console.log(RestaurantData);
        // 将 objectid 转换为 商户创建时间
        RestaurantData.create_time = moment(objectIdToTimestamp(RestaurantData._id));
        model.Restaurant.findOne({userName: (RestaurantData.restaurantName).toLowerCase()}, (err, doc) => {
            RestaurantData.save(err => {
                if(err) console.log(err)
                console.log('register success')
            })
        })
    }
    res.json({
        code: code_Ok,
        msg: '添加成功',
    })

};

// 所有用户打印
const GetRestaurant = (req, res) => {
    model.Restaurant.find({}, (err, doc) => {
        if(err) console.log(err);
        if(doc.length == 0){
            res.send({
                code: code_ERR,
                msg: '附近没有餐厅'
            })
        }else {
            res.send({
                code: code_Ok,
                data: doc,
                msg: '用户信息获取成功'
            })
        }
    })
};


module.exports = (router) => {
    router.post('/restaurantInfo', RestaurantInfo);
    router.post('/getRestaurant', GetRestaurant)
};
