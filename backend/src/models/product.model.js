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

export const Product = mongoose.model("Product", productSchema);