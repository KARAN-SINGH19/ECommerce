const express = require("express");
const cors = require('cors');
const productRoutes = require('./routes/productRoute');  // IN NODE JS WITH HELP OF EXPRESS WE USE REQUIRE TO IMPORT A PARTICULAT FILE OR INSTALLED PACKAGE
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoutes');
const app = express();
const fileUpload = require('express-fileupload')

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true
}))

app.use('/api/v1', productRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', orderRoutes);

module.exports = app;
