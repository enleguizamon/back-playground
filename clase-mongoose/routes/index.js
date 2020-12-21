const express = require('express');
const router = express.Router();
const UserController = require("./../controllers/userController");
const UserService = require("./../services/userService");
const UserInstance = new UserController(new UserService);

router.get('/', function(req, res, next) {
  UserInstance.getUsers(req, res);
});

router.post("/add", function (req, res, next) {
  UserInstance.addUser(req, res)
});

router.put("/modify", function (req, res, next){
  UserInstance.modifyUser(req, res)
});

router.delete("/delete/:id", function (req, res, next) {
  UserInstance.deleteUser(req, res)
});

module.exports = router;

/*Queremos recrear el siguiente ejercicio utilizando la base de datos:
Crear un modelo de usuario que tenga como requerida la propiedad 'name' de tipo String
Crear cuatro endpoints:

El primero va a ser un método GET en la ruta "/" que nos va a devolver el contenido de la collection Users

El segundo va a ser un método POST en la ruta "/add" el cual va a agregar un usuario a la collection users. La respuesta de este endpoint tiene que ser un 200 si todo sale bien o un 400 si todo sale mal (un ejemplo de que salga todo mal es que llegue vacío 'name')

El tercero deberá ser un método PUT en la ruta /modify, y en el cual enviaremos el id del usuario que queremos modificar. También deberá recibir el nuevo valor a ser ingresado. La respuesta de este endpoint tiene que ser un 200 si todo salio bien o un 400 si todo sale mal (un ejemplo de que salga todo mal es que llegue vacío 'name')

El cuarto deberá ser un método DELETE en la ruta /delete/:id, y en el cual enviaremos el id del usuario que queremos borrar.

Opcional: Vamos a agregar un chequeo opcional, solo vamos a permitir que el nombre se agregue si se cumplen las siguiente condiciones:

la variable name existe
la request tiene un header 'token' con el valor 'r2d2' -- Si el token es incorrecto o no existe deberemos devolver un error 404
*/