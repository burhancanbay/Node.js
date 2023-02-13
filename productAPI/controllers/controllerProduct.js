const pool = require("../config/dbConnection");
const queries = require("../queries/queryProduct");

const getProducts = (req, res) => {
  pool.query(queries.getProducts, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getProductDetails = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getProductById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addProduct = (req, res) => {
  const { pname, price } = req.body;
  pool.query(queries.checkProductName, [pname], (error, results) => {
    if (results.rows.length) {
      res.send("The product name already exists");
      return;
    }
    pool.query(queries.addProduct, [pname, price], (error, results) => {
      if (error) throw error;
      res.status(201).send("Product created successfuly!");
    });
  });
};

const removeProduct = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getProductById, [id], (error, results) => {
    if (!results.rows.length) {
      res.send("The product does not exist in database");
    }
    pool.query(queries.removeProductById, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Product removed successfuly!");
    });
  });
};

const updateProduct = (req, res) => {
  const { pname, price } = req.body;
  const id = parseInt(req.params.id);
  pool.query(queries.getProductById, [id], (error, results) => {
    if (!results.rows.length) {
      res.send("The product does not exist in database");
    }
    pool.query(
      queries.updateProductById,
      [pname, price, id],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("Product updated successfuly!");
      }
    );
  });
};
module.exports = {
  getProducts,
  getProductDetails,
  addProduct,
  removeProduct,
  updateProduct,
};
