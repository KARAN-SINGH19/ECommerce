const orderTable = require("../models/orderModel")
const productTable = require('../models/productModel')
const userTable = require('../models/userModel')
const nodemailer = require('nodemailer');
const stripe = require('stripe')('sk_test_51NxBhTEWwd2L3hVcqKggRsddgVdE7Q2gO7tkapbEzMRINxkLf9twyWTIbMv0K9cpkieEAfGXRHTsoyClzt7yhQwX007TC5uy2q');

//FUNC TO PLACE ORDER
exports.storeOrder = async (req, res) => {
    const orderDetails = { ...req.body, user: req.user.id }
    const { email } = req.user
    console.log(email)
    const order = await orderTable.create(orderDetails);
    if (order) {
        res.status(201).json({ success: true, order });
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shopsmart0954@gmail.com',
                pass: 'thaa wcqq yutk qgia'
            }
        });

        var mailOptions = {
            from: 'shopsmart0954@gmail.com',
            to: `${email}`,
            subject: 'Order',
            text: 'Your order has been successfully placed! We will be shipping it out shortly. Thank you for choosing ShopSmart for your shopping needs!'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.send({ Status: "Error" })
            } else {
                return res.send({ Status: "Success" })
            }
        });
    }
    else {
        res.status(400).json({ success: false, error: err.message });
    }
}

//FUNC TO DISPLAY ALL THE ORDER DEATILS (ADMIN)
exports.getOrderDetails = async (req, res) => {
    console.log(req.user.id)
    const orderDetails = await orderTable.find()
    if (orderDetails) {
        res.status(201).json({ success: true, orderDetails });
    }
    else {
        res.status(400).json({ success: false, message: "Something went wrong" });
    }
}


//FUNC TO DISPLAY ORDER DEATILS (USER)
exports.getOrderDetail = async (req, res) => {
    const details = await orderTable.find({ user: req.user.id })
    if (details) {
        res.status(201).json({ success: true, details });
    }
    else {
        res.status(400).json({ success: false, message: "Something went wrong" });
    }
}

//FUNC TO DELETE ORDER DETAILS (USER)
exports.cancelOrder = async (req, res) => {
    console.log(req.params.id)
    const orderId = req.params.id
    return await orderTable.findByIdAndDelete({ _id: orderId }).then(result => {
        res.status(201).json({ success: true, result, message: "Order deleted Successfully" });
    }).catch(err => {
        res.status(400).json({ success: false, err, message: "Something went wrong" });
    });
}


//FUNC TO UPDATE STOCK DETAILS (WHEN THE ORDER STATUS CHANGES TO SHIPPED)
exports.updateStock = async (req, res) => {

    const productId = req.params.id
    const orderedQty = req.params.qty
    const orderId = req.params.orderID

    // GETTING THE USER ID WHO PLACED THE ORDER
    const order = await orderTable.findOne({ _id: orderId })
    const userId = order.user
    console.log('User is', userId)

    // GETTING THE USER'S DETAILS FROM THE USER TABLE WITH THE HELP OF ID
    const userDetails = await userTable.findOne({ _id: userId })

    // GETTING THE USER EMAIL FROM USER OBJECT
    const email = userDetails.email
    console.log('Email is', email)

    // GETTING THE ORDERED PRODUCT DETAILS FROM THE PRODUCT TABLE
    const orderedProduct = await productTable.findById({ _id: productId })

    // ACCESSING THE STOCK QTY OF THAT PRODUCT
    const stock = orderedProduct.stock

    // FINDING OUT THE NEW STOCK QTY BY SUBTTACTING THE ORIGNAL STOCK FROM THE ORDERED STOCK
    const newStock = stock - orderedQty

    // UPDATING THE STOCK QTY
    const updateStockQty = await productTable.findByIdAndUpdate(productId, { stock: newStock }, { new: true, runValidators: true, useFindAndModify: false })

    // UPDATING THE ORDER STATUS ()
    const updateOrderStatus = await orderTable.findOneAndUpdate(
        { _id: orderId, "orderItems.productId": productId },
        { $set: { "orderItems.$.status": "Shipped" } },
        { new: true }
    );

    if (updateStockQty && updateOrderStatus) {
        res.status(201).json({ success: true, message: "Stock and status updated successfully", updateStockQty, updateOrderStatus });
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shopsmart0954@gmail.com',
                pass: 'thaa wcqq yutk qgia'
            }
        });

        var mailOptions = {
            from: 'shopsmart0954@gmail.com',
            to: `${email}`,
            subject: 'Order',
            text: 'Your order has been successfully shipped!. Thank you for choosing ShopSmart for your shopping needs!'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.send({ Status: "Error" })
            } else {
                return res.send({ Status: "Success" })
            }
        });
    }
    else {
        res.status(400).json({ success: false, message: "Something went wrong" });
    }

}



exports.stripeGateway = async (req, res) => {

    const { products } = req.body; // Assuming products is an array of items
    console.log(products);

    // Creating line items for the checkout session
    const lineItems = products.map(product => {
        return {
            price_data: {
                currency: "aed",
                product_data: {
                    name: product.name
                },
                unit_amount: product.price * 100 // Multiply by 100 to convert to cents
            },
            quantity: product.quantity
        };
    });

    try {
        // Creating the checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/Success",
            cancel_url: "http://localhost:3000/Cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
};


//FUNC TO COUNT NO OF ORDERS
exports.countOrders = async (req, res) => {
    try {
        const orderCount = await orderTable.countDocuments({})

        if (orderCount) {
            res.status(200).json({ success: true, orderCount })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}


// FUNC TO CALCULATE THE TOTAL SALE
exports.totalSale = async (req, res) => {
    try {
        const sale = await orderTable.aggregate([{ $group: { _id: null, saleAmt: { $sum: "$totalPrice" } } }])  // WILL RETUNR AN ARRAY WHICH CONATINS AND OBJECT OR MULTIPLE OBJECTS
        if (sale.length > 0) {
            res.status(200).json({ success: true, totalSaleAmt: sale[0].saleAmt })
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}