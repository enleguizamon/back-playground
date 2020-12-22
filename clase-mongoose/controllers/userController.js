class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getUsers(req, res) {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    let offset = limit*(page - 1);

    const users = await this.userService.getUsers(offset, limit);
    res.status(200).json(users);
  }

  async addUser(req, res) {
    //el service
    const response = await this.userService.addUser(req.body);
    res.send("ok");
  }

  async modifyUser(req, res) {
    const { body, headers } = req;
    const { token } = headers;
    const { id, data } = body;

    //chequeo primero el token y el name.
    if (token != "r2d2") {
      res.status(401).send("token invalido")
    }

    if (!data.name) {
      res.status(401).send("name requerido");
    }
    const modified = await this.userService.modifyUser(id, data);
    if (modified) {
      res.status(200).send("ok");
    } else {
      res.status(400).send("no se encontró el usuario");
    }
  }
  /** usé este ejemplo en postman. 
   * Lo que quiero modificar tiene que estar contenido en un objeto.   
  {
    "id": "5fdd4422b2738f2260f0fa40",
    "data": {
        "name": "batman"
      }
  } 
*/

  async deleteUser(req, res) {
    const { id } = req.params;
    const deleted = await this.userService.deleteUser(id);
    //{deletecount: 0} es lo que devuelve cuando no encuentra el usuario.
    //lo arreglo en el sevice.
    if (deleted) {
      res.status(200).send("ok");
    } else {
      res.status(400).send("no se pudo borrar el usuario");
    }
  }
}

module.exports = UserController;
