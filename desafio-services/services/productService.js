const Product = require("./../models/productModel");

class ProductService {

  getProducts() {
    const query = Product.find().exec();
    return query;
  }

  getProductById(id) {
    const query = Product.findOne({_id: id}).exec()
    return query;
  }

  postProducts(product) {
    const newProduct = new Product(product);
    return newProduct.save();
  }

  modifyProductById(id, data) {
    const product = Product.findOneAndUpdate({ _id: id }, data).exec();
    return product;
  }

}

module.exports = ProductService;