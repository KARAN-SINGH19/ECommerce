//IMPORTING MONGOOSE
const mongoose = require('mongoose');

//FUNC TO CONNECT NODE WITH MONGODB
const connection = () => {
    mongoose.connect(process.env.DB_URL, {
    }).then(() => {
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    }).catch((err) => {
        console.error(err);
    });
}

module.exports = connection
