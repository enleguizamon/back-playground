const UserService = require("../services/UserService");

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async createUser(req, res) {
    const { body } = req;
    const name = body.name.toLowerCase();

    if (body && body.name && body.password) {
      try {
        //como name cambia una parte del body, uso el spread operator para crear una copia de 
        //body y agregarle la nueva variable name
        const user = await this.userService.createUser({ ...body, name });
        return res.status(200).json(user);
      } catch (e) {
        console.log(e);
      }
    } else {
      res.sendStatus(400);
    }
  }
}

module.exports = UserController;
