const mongoose = require("mongoose")

const shippingSchema = new mongoose.Schema({
    shippingAddress: {
        address: { type: String },
        city: { type: String },
        state: { type: String },
        phoneNo: { type: Number, maxlength: [10] },
        pinCode: { type: Number, maxlength: [5] },
        country: { type: String,default:"United Arab Emirates" }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("shippingDetails", shippingSchema)