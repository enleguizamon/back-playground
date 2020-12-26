class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  //funcion que recibe un string para ver si tiene la forma correcta del id.
  isValidObjectId(id) {
    const ObjectID = require("mongodb").ObjectID;
    return ObjectID.isValid(id);
  }

  async getProducts(req, res) {
    try {
      const products = await this.productService.getProducts();
      return res.json(products);
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      //primero controlo que el id sea correcto.
      if (!this.isValidObjectId(id)) {
        return res.status(400).send("ingrese un id válido");
      }

      const productById = await this.productService.getProductById(id);

      if (productById) {
        return res.status(200).json(productById);
      } else {
        return res.status(404).send("id inexistente");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }

  async postProducts(req, res) {
    try {
      const { body } = req;
//chequeo los requiridos para ser específica con el error.
      if(!body.name || !body.price) {
        return res.status(400).send("name y price requeridos");
      }

      const response = await this.productService.postProducts(body);

      if(response) {
        return  res.status(201).send("creado");
      } else {
        return res.status(400).send("error en la creación")
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }

  async modifyProductById(req, res) {
    try {
      const { id } = req.params;
      const { data } = req.body;

      if (!this.isValidObjectId(id)) {
        return res.status(400).send("ingrese un id válido");
      }

      const modified = await this.productService.modifyProductById(id, data);

      if (modified) {
        res.status(200).send("ok");
      } else {
        return res.status(404).send("id inexistente");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }
}

module.exports = ProductController;
