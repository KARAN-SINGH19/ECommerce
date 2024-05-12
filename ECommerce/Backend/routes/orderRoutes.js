const express = require('express')
const { storeOrder, getOrderDetails, getOrderDetail, cancelOrder, updateStock, stripeGateway, countOrders, totalSale } = require('../controller/orderController')
const userAuth = require('../middleware/auth')
const router = express.Router()


router.route('/storeOrder').post(userAuth, storeOrder)
router.route('/getOrderDetails').get(userAuth, getOrderDetails)
router.route('/getOrderDetail').get(userAuth, getOrderDetail)
router.route('/cancelOrder/:id').delete(userAuth, cancelOrder)
router.route('/updateStock/:id/:qty/:orderID').put(userAuth, updateStock)
router.route('/stripeGateway').post(userAuth, stripeGateway)

// ADMIN
router.route('/countOrders').get(userAuth, countOrders)
router.route('/totalSale').get(userAuth, totalSale)

module.exports = router;