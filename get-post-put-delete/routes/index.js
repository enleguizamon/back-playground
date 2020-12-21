const express = require("express");
const router = express.Router();
const UserController = require("./../controllers/userController");
const UserInstance = new UserController();

router.get('/', function(req, res, next) {
  UserInstance.showNames(req, res);
});

router.post("/add", function (req, res, next) {
  UserInstance.postNames(req, res);
});

router.put("/modify", function (req, res, next) {
  UserInstance.modifyName(req, res);
});

router.delete("/delete/:indice", function (req, res, next) {
  UserInstance.deleteName(req, res);
})

module.exports = router;
