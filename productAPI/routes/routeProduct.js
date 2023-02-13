const express = require("express");
const controller = require("../controllers/controllerProduct");
const router = express.Router();

router.get("/", controller.getProducts);

router.post("/", controller.addProduct);

router.get("/:id", controller.getProductDetails);

router.put("/:id", controller.updateProduct);

router.delete("/:id", controller.removeProduct);

module.exports = router;
