const userTable = require('../models/userModel')
const bcrypt = require('bcryptjs');
const shippingTable = require('../models/shippingModel')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const feedbackTable = require('../models/feedbackModel')

//FUNC TO REGISTER USER
exports.registerUser = async (req, res) => {
    try {

        const { email } = req.body
        const checkEmail = await userTable.findOne({ email: email })

        if (!checkEmail) {
            const user = await userTable.create(req.body);
            const jwtToken = user.getJWTToken(); // Generate JWT token

            res.status(201).json({ success: true, jwtToken });

        }
    } catch (error) {
        res.status(500).json({ success: false, error, message: 'Internal Server Error' });
    }
}


//FUNC TO LOGIN USER
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userTable.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Invalid Login Credentials!' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid Login Credentials!' });
        }

        const jwtToken = user.getJWTToken(); // Generate JWT token

        res.status(200).json({ success: true, message: 'Login successful', jwtToken });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// FUNCT TO LOGOUT THE USER
exports.logoutUser = (req, res) => {
    try {
        res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


//FUNC TO GET USER'S ROLE
exports.getUserRole = async (req, res) => {
    const user = await userTable.findOne({ role: req.user.role });
    if (user) {
        res.status(200).json({ success: true, user });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
}



//FUNC TO DISPLAY USER DETAILS
exports.getUserDetails = async (req, res) => {

    const user = await userTable.findOne({ _id: req.user.id });
    if (user) {
        res.status(200).json({ success: true, user });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
}

//FUNC TO UPDATE USER DETAILS
exports.updateUserDetails = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        let newData = {
            name: name,
            email: email,
            age: age,
        };

        const updatedUser = await userTable.findByIdAndUpdate(req.user.id, newData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user: updatedUser, message: "Details updated successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, error: err, message: 'Something went wrong' });
    }
};



//FUNC TO DISPLAY ALL USER DETAILS (ADMIN)
exports.getUsers = async (req, res) => {
    return await userTable.find().then(result => {
        res.status(200).json({ success: true, result, message: "User details fetched successfully" });
    }).catch(err => {
        return res.status(404).json({ success: false, err, message: 'Something went wrong' })
    })
}


//FUNC TO DELETE USER DETAILS (ADMIN)
exports.deleteUser = async (req, res) => {
    const userId = req.params.id
    if (!userId) {
        return res.status(404).json({ success: false, err, message: 'Id not found' })
    }
    return await userTable.deleteOne({ _id: userId }).then(result => {
        res.status(200).json({ success: true, result, message: "User deleted successfully" });
    }).catch(err => {
        return res.status(404).json({ success: false, err, message: 'Something went wrong' })
    })
}

// FUNC TO CHECK WHETHER THE USER'S SHIPPING DETAILS EXIST IN DB
exports.checkShippingDetails = async (req, res) => {
    try {
        const existingShippingDetails = await shippingTable.findOne({ user: req.user.id });

        if (existingShippingDetails) {
            return res.status(200).json({ success: true, existingShippingDetails, message: "Shipping details of the user already exist in the database" });
        } else {
            return res.status(200).json({ success: true, message: "Shipping details not found" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


//FUNC TO ADD SHIPPING DETAILS OF USER
exports.addShippingDetails = async (req, res) => {
    try {
        const details = req.body;

        const finalDetails = { ...details, user: req.user.id };


        const result = await shippingTable.create(finalDetails);

        if (result) {
            return res.status(201).json({ success: true, result, message: "Details added successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Failed to add details" });
        }

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


//FUNC TO GET USER'S SHIPPING DETAILS
exports.getShippingdetails = async (req, res) => {
    const details = await shippingTable.findOne({ user: req.user.id })
    if (details) {
        return res.status(201).json({ success: true, details, message: "Shipping Details fetched successfully" });
    }
    else {
        return res.status(400).json({ success: false, message: "Failed to add details" });
    }
}

//FUNC TO UPDATE THE SHIPPING DETAILS
exports.updateShippingDetails = async (req, res) => {
    const { address, city, state, phoneNo, pinCode } = req.body
    const newData = {
        address: address,
        city: city,
        state: state,
        phoneNo: phoneNo,
        pinCode: pinCode
    }
    const updateDetails = await shippingTable.findOneAndUpdate({ user: req.user.id }, { $set: { shippingAddress: newData } }, { new: true })
    if (updateDetails) {
        return res.status(201).json({ success: true, updateDetails, message: "Shipping Details updated successfully" })
    }
    else {
        return res.status(400).json({ success: false, message: "Failed to update details" });
    }
}


//FUNC TO COUNT NO OF PRODUCTS
exports.countUsers = async (req, res) => {
    try {
        const userCount = await userTable.countDocuments({})
        if (userCount) {
            res.status(200).json({ success: true, userCount })
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}

//FUNC TO SEND EMAIL TO THE USER
exports.sendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userTable.findOne({ email: email })
        const userId = user._id
        const userRole = user.role

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tripcanvas30@gmail.com',
                pass: 'bdrn agxo ykts xwgu'
            }
        });

        var mailOptions = {
            from: 'tripcanvas30@gmail.com',
            to: 'rehalkaran37@gmail.com',
            subject: `${email}`,
            text: `http://localhost:3000/ResetPassword/${userId}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.send({ Status: "Error" })
            } else {
                return res.send({ Status: "Success" })
            }
        });



    } catch (error) {
        res.status(400).json({ success: false, message: "Something went wrong" })
    }
}


//FUNC TO UDPATE USER PASSWORD
exports.updatePassword = async (req, res) => {
    try {
        const { password } = req.body
        const userId = req.params.userId

        if (password.length < 8) {
            return res.json({ success: false, message: "Password should have at least 8 characters!!" });
        }

        const encrypedPass = await bcrypt.hash(password, 10);
        const updatePass = await userTable.findOneAndUpdate({ _id: userId }, { $set: { password: encrypedPass } })

        if (updatePass) {
            res.status(200).json({ success: true, message: "Password changed successfully!!" })
        }

    } catch (error) {
        res.json({ success: false, message: "Please enter a password!!" });
    }
}

// FUNC TO GIVE FFEDBACK
exports.userFeedback = async (req, res) => {
    try {
        const { feedback } = req.body
        const data = {
            feedback: feedback,
            user: req.user.name
        }
        const userFeedback = await feedbackTable.create(data)
        if (userFeedback) {
            res.status(201).json({ success: true, message: 'Feedback received successfully' })
        }
        else {
            res.status(400).json({ success: true, message: 'Something went wrong' })
        }
    }
    catch (error) {
        res.status(500).json({ success: true, error, message: "Internal server error" })
    }
}

// FUNC TO FETCH FFEDBACK (ADMIN)
exports.fetchFeedback = async (req, res) => {
    try {
        const feedbackList = await feedbackTable.find()
        if (feedbackList) {
            res.status(201).json({ success: true, feedbackList, message: "Fetched successfully" })
        }
        else {
            res.status(400).json({ success: true, message: "Something went wrong" })
        }
    }
    catch (error) {
        res.status(500).json({ success: true, error, message: "Internal server error" })
    }
}