// /models/category.js
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default:0
    }
})

const Category = mongoose.model('category', categorySchema)

module.exports = Category