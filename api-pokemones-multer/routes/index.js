const express = require('express');
const router = express.Router();
const PokeController = require("../controllers/pokeController");
const PokeService = require("./../services/pokeService");
const PokeInstance = new PokeController(new PokeService)
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
  cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
 });
 const upload = multer({ storage: storage });

router.get('/', function(req, res, next) {
  PokeInstance.getPokemones(req, res)
});

router.post("/createpokemon", upload.single("image"), function(req, res, next) {
  PokeInstance.createPokemon(req, res)
})

router.put("/modifypokemon/:id", function(req, res, next) {
  PokeInstance.modifyPokemon(req, res)
})

router.delete("/deletepokemon", function(req, res, next) {
  PokeInstance.deletePokemon(req, res)
})
module.exports = router;
