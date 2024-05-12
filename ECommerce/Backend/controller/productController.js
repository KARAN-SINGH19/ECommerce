const productTable = require('../models/productModel')
const Features = require('../utils/features')
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: 'dsvtq6uiw',
    api_key: '228789181965381',
    api_secret: 'LdFeYVZUFZetvY1uYHpHTiNbg3o'
});



//FUNC TO ADD PRODUCT DETAILS 
exports.addProduct = async (req, res, next) => {
    const product = await productTable.create(req.body)
    res.status(201).json({ success: true, product })
}

//FUNC TO DISPLAY ALL PRODUCT DETAILS 
exports.getProducts = async (req, res) => {
    const products = await productTable.find()
    res.status(201).json({ success: true, products })
}


exports.getProductList = async (req, res) => {
    const productList = await productTable.find()
    res.status(201).json({ success: true, productList })
}


//FUNC TO UPDATE PRODUCT DETAILS 
exports.updateProducts = async (req, res) => {
    const product = await productTable.findById(req.params.id)

    if (!product) {
        return res.status(500).json({ success: false, message: 'product not found' })
    }

    const updateProduct = await productTable.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })
    res.status(201).json({ success: true, product })
}

//FUNC TO DELETE PRODUCT DETAILS 
exports.deleteProducts = async (req, res) => {
    try {
        const product = await productTable.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        await productTable.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//FUNC TO DISPLAY SINGLE PRODUCT DETAILS 
exports.getProductdetails = async (req, res) => {
    const product = await productTable.findById(req.params.id)

    if (!product) {
        return res.status(500).json({ success: false, message: 'product not found' })
    }

    res.status(201).json({ success: true, product })
}

//FUNC TO SEARCH PRODUCT DETAILS 
exports.searchProducts = async (req, res) => {
    const obj = new Features()
    const result = await obj.search(productTable.find(), req.query.keyword)

    if (result.length === 0) {
        return res.status(400).json({ success: false, message: 'product not found' })
    }
    res.status(201).json({ success: true, result, message: "Search succcessfull" })
}

//FUNC TO FILTER PRODUCT DETAILS BASED ON DESCRIPTION
exports.filterProducts = async (req, res) => {
    const obj = new Features()
    const result = await obj.filter(productTable.find(), req.query.category)

    if (result.length === 0) {
        return res.status(400).json({ success: false, message: 'category not found' })
    }

    res.status(201).json({ success: true, result })
}


//FUNC FOR PAGINATION
exports.pagination = async (req, res) => {
    const resultPerPage = 5;
    const obj = new Features()
    const result = await obj.pagination(resultPerPage, productTable.find(), req.query.page)

    if (result.length === 0) {
        return res.status(400).json({ success: false, message: 'category not found' })
    }

    res.status(201).json({ success: true, result })
}


//FUNC TO COUNT NO OF PRODUCTS
exports.countProducts = async (req, res) => {
    try {
        const productCount = await productTable.countDocuments({})
        if (productCount) {
            res.status(200).json({ success: true, productCount })
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" })
    }
}


//FUNC TO COUNT THE STOCK
exports.countStock = async (req, res) => {
    try {
        const inStockCount = await productTable.countDocuments({ stock: { $gt: 0 } });
        const outOfStockCount = await productTable.countDocuments({ stock: { $eq: 0 } });
        res.status(200).json({ success: true, inStockCount, outOfStockCount });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


//FUNC TO COUNT PRODUCTS PER CATEGORY
exports.countCategoryProduct = async (req, res) => {
    try {
        const categories = ['Clothing', 'Footwear', 'Console', 'Mobile', 'Laptop', 'Speakers', 'Headsets', 'Monitor', 'Gaming']
        const counts = {};

        for (const category of categories) {
            const countCategory = await productTable.countDocuments({ category });
            counts[category] = countCategory // THIS IS HOW WE ADD ITEMS INTO AN OBJECT USING FOR LOOP ( myObject['propa' + i] = foo;). FOR ARAYS WE CAN DORECTLY USE THE PUSH() FUNCTION.
        }

        res.status(200).json({ success: true, counts })
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

// FUNC TO UPDATE Stock Status (status update from in stock to out of stock)
exports.updateStockStatus = async (req, res) => {
    try {
        const { id } = req.params
        const updateStatus = await productTable.findByIdAndUpdate({ _id: id }, { $set: { status: "Out-Of-Stock" } })
        if (updateStatus) {
            res.status(200).json({ success: true, message: 'Status updated successfully!!' })
        }
        else {
            res.status(200).json({ success: false })
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}


// FUNC TO UPDATE Stock Status (status update from out of stock to in stock)
exports.updateStockStatus2 = async (req, res) => {
    try {
        const { id } = req.params
        const updateStatus2 = await productTable.findByIdAndUpdate({ _id: id }, { $set: { status: "In-Stock" } })
        if (updateStatus2) {
            res.status(200).json({ success: true, message: 'Status updated successfully!!' })
        }
        else {
            res.status(200).json({ success: false })
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}