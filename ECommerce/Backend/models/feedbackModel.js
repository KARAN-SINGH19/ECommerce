const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String
    },
    user: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Feedbacks', feedbackSchema)