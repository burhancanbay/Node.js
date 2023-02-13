const getProducts = "SELECT * FROM products";
const getProductById = "SELECT * FROM products WHERE id = $1";
const checkProductName = "SELECT pname FROM products WHERE pname = $1";
const addProduct = "INSERT INTO products (pname,price) VALUES ($1,$2)";
const removeProductById = "DELETE FROM products WHERE id = $1";
const updateProductById =
  "UPDATE products SET pname = $1, price = $2 WHERE id = $3";

module.exports = {
  getProducts,
  getProductById,
  checkProductName,
  addProduct,
  removeProductById,
  updateProductById,
};
