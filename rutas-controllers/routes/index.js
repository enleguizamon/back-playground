var express = require("express");
var router = express.Router(); //express levanta el servidor y .Router me da las funcionalidades, x ej: router.get
const UserController = require("./../controllers/userController"); //agrego controllers para mantener separada la lógica.

const UserInstance = new UserController();

//Tengo una ruta dinámica y y con req.params la puedo ver.
router.get("/test/:name", function (req, res, next) {
  console.log(req.params);
  res.json("Esto es un test");
});

//ejercicio 3:
//- Utilizando Express crear una ruta que reciba como parametro nuestro nombre y lo muestre en pantalla.
//- Pasarle por query nuestra edad y mostrarla también
router.get("/name/:name", function (req, res, next) {
  UserInstance.getName(req, res);
});

//ejercicio 4:
//- Utilizando Express crear una ruta que reciba como parámetro un número y nos muestre en pantalla
//el mismo número multiplicado por 2
router.get("/number/:number", function (req, res, next) {
  UserInstance.multiply(req, res);
});

//Ejercicio 5
//- Utilizando Express crear una ruta que reciba como parámetro una palabra, y nos devuelva en pantalla
//si la misma es o no un palíndromo en el siguiente formato:
//'La frase ${frase} es un palíndromo ya que al revés se lee: {frase al revés}.'
//o en su defecto 'La frase ${frase} NO es un palíndromo ya que al revés se lee: {frase al revés}.'
router.get("/word/:word", function (req, res, next) {
  UserInstance.palindrome(req, res);
});

// Ejercicio 0:
// Crear una ruta estática [GET] /calcular que nos devuelva en un json la siguiente información:
//   - Cuantos números primos existen entre 1 y 150 - Un listado de esos números.
router.get("/primos", function (req, res, next) {
  UserInstance.primos(req, res);
});

// Ejercicio 1:
// endpoint: https://api.github.com/users/doomling
// Queremos crear una API con una ruta dinámica [GET] /user/:id que busque la informacion del usuario ingresado en la API de Github y nos devuelva todo
router.get("/user/:id", function (req, res, next) {
  UserInstance.getUser(req, res);
})

// Ejercicio 2:
// - Crear otra ruta /user/:id/details que busque la informacion del usuario ingresado en la API de Github
// - Limitar la información que nos devuelve a: "Nombre, empresa y bio"
router.get("/user/:id/details", function (req, res, next) {
  UserInstance.getUserDetails(req, res);
})

// Ejercicio 3:
// - A la misma ruta del ejercicio anterior agregarle en la información que devuelve nuestra edad y gusto de helado favorito (tip: ...)
//Hecho en el ejercicio 2.

// Ejercicio 4:
// - Utilizando la misma lógica del ejercicio 0 devolver una lista de los primeros 150 números primos
// - Utilizando la poke api https://pokeapi.co/ devolver a que Pokemon representa ese número en el siguiente formato

// {
//   "primeNumber": "2",
//   "pokemonName": "ivisaur"
// }
router.get("/pokemonprimo", function (req, res, next) {
  UserInstance.getPokePrimo(req, res);
})

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("Hola");
});

module.exports = router;
