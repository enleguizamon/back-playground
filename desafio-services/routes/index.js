const express = require('express');
const router = express.Router();
const ProductController = require("./../controllers/productController");
const ProductService = require("./../services/productService");
const ProductInstance = new ProductController(new ProductService)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hola");
});

router.get('/products', function(req, res, next) {
  ProductInstance.getProducts(req, res)
});

router.get('/products/:id', function(req, res, next) {
  ProductInstance.getProductById(req, res)
});

router.post('/products', function(req, res, next) {
  ProductInstance.postProducts(req, res)
});

router.put('/products/:id', function(req, res, next) {
  ProductInstance.modifyProductById(req, res)
});

module.exports = router;
