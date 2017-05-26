const express = require('express')
const UserController = require('../controller/user.js')
const RestaurantController = require('../controller/restaurant.js')
const router = express.Router()

UserController(router);
RestaurantController(router);

module.exports = router
