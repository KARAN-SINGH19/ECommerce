const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: "product",
                required: true
            },
            productName: {
                type: String,
                required: [true, 'Please enter product name'],
                trim: true
            },
            productPrice: {
                type: Number,
                required: [true, 'Please enter product price'],
            },
            quantity: {
                type: Number,
                required: [true, 'Please enter the quantity'],
            },
            status: {
                type: String,
                default: "Processing"
            }
        }
    ],
    vatPrice: {
        type: Number,
        required: [true, 'Please enter vat price'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'Please enter total price'],
    },
    placedAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Order", orderSchema);