const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String, 
    require: true
  },
  edad: {
    type: Number
  }
})

module.exports = mongoose.model("User", userSchema);