function checkAdmin (req, res, next) {
  if (req.user) {
    if (req.user.isAdmin) {
      console.log("el user es admin");
      next()
    } else {
      console.log("no es admin");
      res.status(403).send("no sos admin")
    }
  } else {
    console.log("no hay user logeado");
    res.status(401).send("no estás logeado")
  }
}

module.exports = checkAdmin;