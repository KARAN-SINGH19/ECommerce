const express = require('express')
const { registerUser, loginUser, getUserDetails, updateUserDetails, logoutUser, getUsers, addShippingDetails, getShippingdetails, getUserRole, checkShippingDetails, updateShippingDetails, countUsers, sendVerificationEmail, updatePassword, userFeedback, fetchFeedback } = require('../controller/userController')
const userAuth = require('../middleware/auth')
const router = express.Router()

router.route('/registerUser').post(registerUser)
router.route('/loginUser').post(loginUser)
router.route('/logoutUser').get(logoutUser)
router.route('/getUserRole').get(userAuth, getUserRole)

router.route('/getUserDetails').get(userAuth, getUserDetails)
router.route('/updateUserDetails').post(userAuth, updateUserDetails)

// USER FEEDBACK
router.route('/userFeedback').post(userAuth, userFeedback)
router.route('/fetchFeedback').get(userAuth, fetchFeedback)

//SHIPPING DETAILS
router.route('/checkShippingDetails').post(userAuth, checkShippingDetails)
router.route('/addShippingDetails').post(userAuth, addShippingDetails)
router.route('/getShippingdetails').get(userAuth, getShippingdetails)
router.route('/updateShippingDetails').put(userAuth, updateShippingDetails)

//FOR ADMIN
router.route('/getUsers').get(userAuth, getUsers)
router.route('/countUsers').get(userAuth, countUsers)

//CHANGE PASSWORD
router.route('/sendVerificationEmail').post(sendVerificationEmail)
router.route('/updatePassword/:userId').post(updatePassword)

module.exports = router