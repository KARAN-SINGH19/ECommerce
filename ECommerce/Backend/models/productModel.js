const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    status:
    {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxlength: [5, 'Price cannot exceed 5 characters']
    },
    images: [{
        url: {
            type: String,
        }
    }],
    ratings: {
        type: Number,
        maxlength: [1, 'Rating cannot exceed more than 1 characters'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    stock: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model("Product", productSchema);