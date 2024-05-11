const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const userScehma = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'], //required will make this field required
        maxlength: [30, 'Price cannot exceed 5 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email'] //this will ensure in email field only email is entered not any other data
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'Password should have atleat 8 characters'],
    },
    role: {
        type: String,
        default: "User" //Deafult value will be user
    },
    age: {
        type: Number,
        min: [18, 'Must be at least 18 years old'],
        required: [true, 'Please enter your age']
    }
})

userScehma.pre("save", async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});


//FUNCTION TO GENERATE A JWT TOKEN
userScehma.methods.getJWTToken = function () {
    const token = jwt.sign({ id: this._id, email: this.email, role: this.role, name: this.name }, process.env.JWT_KEY, {
        expiresIn: 86400000
    });

    return token
}


module.exports = mongoose.model("User", userScehma);
