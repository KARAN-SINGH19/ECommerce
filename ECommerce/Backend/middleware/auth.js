const jwt = require('jsonwebtoken')
const userTable = require('../models/userModel')

userAuth = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Token:', token);

    if (!token) {
        console.log("Please Login!!");
        return res.json({ success: false, message: 'Please login' });
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_KEY);
        console.log('Decoded Data:', decodedData);

        // Find user in the database using the decoded user id
        req.user = await userTable.findById(decodedData.id);
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = userAuth;
