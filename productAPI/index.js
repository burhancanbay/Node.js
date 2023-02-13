const express = require("express");
require("dotenv/config");

const productsRouter = require("./routes/routeProduct");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.LISTEN_PORT | 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
