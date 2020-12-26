const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  stock: {
    type: Number
  },
  freeshiping: {
    type: Boolean
  }
})

module.exports = mongoose.model("Product", productSchema)