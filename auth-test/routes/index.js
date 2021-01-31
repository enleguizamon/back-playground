const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require("./../controllers/userController");
const UserService = require("./../services/userService");
const UserInstance = new UserController(new UserService)

const checkAdmin = require("./../utils/checkAdmin");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hola");
});

router.get("/onlyadmins", checkAdmin, (req, res, next) => {
  res.send("solo me acceden admins")
})

//para autenticarse
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  return res.json({
    ok: true
  });
});

//para verificar que estás autenticado o no
router.get("/api/verify", (req, res) => {
  return res.json(req.user);
}) 

router.post("/create", (req, res) => {
  UserInstance.createUser(req, res);
})
module.exports = router;
