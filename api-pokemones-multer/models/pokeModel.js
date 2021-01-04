const mongoose = require("mongoose");

const pokeSchema = mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  pokemonId: {
    type: Number
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  type: {
    type: String
  },
  disabled: {
    type: Boolean
  }
});

module.exports = mongoose.model("Pokemon", pokeSchema)