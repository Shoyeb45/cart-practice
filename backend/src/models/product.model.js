import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: "A good product"
    },
    productImage: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    }

}, {timestamps: true});

export const createProduct = async function(data) {

    return (await Product.create({
        category: data.category,
        price: data.price,
        description: data.description,
        productImage: data.productImage,
        quantity: data.quantity,
        productName: data.productName
    }));
};

export const Product = mongoose.model("Product", productSchema);