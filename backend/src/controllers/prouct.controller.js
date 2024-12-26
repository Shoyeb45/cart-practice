import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "./../models/product.model.js";

const getProduct = asyncHandler ( async (req, res) => {
    try {
        console.log("ga");
        
        const products = await Product.find(); // Fetch all products
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export {
    getProduct
}