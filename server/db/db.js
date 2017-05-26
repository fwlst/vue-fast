const mongoose = require('mongoose')
const config = require('config-lite')(__dirname)

// mongodb 连接🔗
mongoose.connect(config.mongodb)
// 此处防止 node.js - Mongoose: mpromise 错误
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connect error'))
db.once('open', function () {
    console.log('MongoDB启动成功')
})


let userSchema = mongoose.Schema({
    userName: String,
    password: String,
    confirm_pwd:String,
    recheck: String,
    token: String,
    head_pic: String,
    nickname: String,
    balance: String,
    integral: String,
    city: String,
    create_time: Date
})

let restaurantSchema = mongoose.Schema({
    restaurantName: String,
    restaurantPic: String,
    distributionTime:String,
    distance: String,
    vacancy: String,
    collect: Number,
    restaurantType: String,
    address: String,
    telephone: String,
    create_time: Date
})

let model = {
    // 在此处扩展 model，例如：
    // Article: mongoose.model('Article', articleSchema),
    User: mongoose.model('User', userSchema),
    Restaurant: mongoose.model('Restaurant', restaurantSchema)
}

module.exports = model
