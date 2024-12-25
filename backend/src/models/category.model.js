import mongoose, { mongo } from "mongoose";

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    }
}, {timestamps: true});


export const createCategory = async function(cate) {
    return (await Category.create({
        category: cate
    }));
}

export const Category = mongoose.model("Category", categorySchema);