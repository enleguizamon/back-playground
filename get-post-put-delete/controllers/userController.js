class UserController {
  constructor() {
    this.names = ["eli", "juan", "batman"];
  }

  //1. Método GET en la ruta "/" que nos va a devolver un array
  //de nombres que vayamos agregando (al principio va a devolver un array vacio)
  showNames(req, res) {
    res.send(this.names);
  }

  //2. Método POST en la ruta "/add" el cual va a agregar una variable 'name' al array
  //del que hablamos en el primer endpoint. La respuesta de este endpoint tiene que ser
  //un 200 si todo salio bien o un 400 si todo sale mal (un ejemplo de que salga todo mal es que llegue vacío 'name')
  postNames(req, res) {
    const { body } = req;

    if (body.name) {
      this.names.push(body.name);
      res.status(200).send("usuario agregado con éxito.");
    } else {
      res.status(400).send("falta información");
    }
  }

  //3. Método PUT en la ruta /modify, y en el cual enviaremos un número de índice que
  //representa la posición del array de nombres que queremos modificar. También deberá
  //recibir el nuevo valor a ser ingresado. La respuesta de este endpoint tiene que ser
  //un 200 si todo salio bien o un 400 si todo sale mal (un ejemplo de que salga todo mal es que llegue vacío 'name')
  modifyName(req, res) {
    const { body, headers } = req;
    const { name, i } = body;
    const { token } = headers;

    if (token != "r2d2") {
      res.status(401).send("token invalido");
    }

    if (name && i) {
      this.names.splice(i, 1, name);
      res.status(200).send(`se modificó el indice ${i} con el nombre ${name}`);
    } else {
      res.status(400).send("falta informacion");
    }
  }

  //4. Método DELETE en la ruta /delete/:indice, y en el cual enviaremos un número de
  //índice que representa la posición del array de nombres que queremos borrar.
  deleteName(req, res) {
    const { indice } = req.params;

    if (indice < this.names.length){
      this.names.splice(indice, 1);
      res.status(200).send(`se borró el indice ${indice}`);
    } else {
      res.status(400).send("el indice no se encuentra en la lista");
    }
  }

  //5. Opcional: Vamos a agregar un chequeo opcional, solo vamos a permitir que el nombre
  //se agregue si se cumplen las siguiente condiciones:
  //- la variale name existe
  //- la request tiene un header 'token' con el valor 'r2d2'
  //Si el token es incorrecto o no existe deberemos devolver un error 401
}

module.exports = UserController;