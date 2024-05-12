const express = require('express')
const { getProducts, addProduct, updateProducts, deleteProducts, getProductdetails, searchProducts, filterProducts, pagination, countProducts, countStock, countCategoryProduct, updateStockStatus, updateStockStatus2, getProductList } = require('../controller/productController')
const userAuth = require('../middleware/auth')
const router = express.Router()

// USER
router.route('/getProducts').get(getProducts)

// ADMIN
router.route('/getProductList').get(userAuth, getProductList)

// ADMIN
router.route('/addProduct').post(userAuth, addProduct)
router.route('/updateProduct/:id').put(userAuth, updateProducts)
router.route('/deleteProducts/:id').delete(userAuth, deleteProducts)

// USER
router.route('/getProductdetails/:id').get(getProductdetails)
router.route('/searchProducts').get(searchProducts)
router.route('/filterProducts').get(filterProducts)
router.route('/pagination').get(pagination)
router.route('/updateStockStatus/:id').get(updateStockStatus)
router.route('/updateStockStatus2/:id').get(updateStockStatus2)

// ADMIN
router.route('/countCategoryProduct').get(userAuth, countCategoryProduct)
router.route('/countProducts').get(userAuth, countProducts)
router.route('/countStock').get(userAuth, countStock)

module.exports = router