const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const { expressjwt: jwt } = require("express-jwt");
const errorHandler = require("./helpers/error-handler");
const jwtAut = require("./helpers/jwt");

// middleware
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));
const secret = process.env.secret;
const api = process.env.API_URL;
app.use(jwtAut);
app.use(errorHandler);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

// routes
const productsRoutes = require("./routers/product");
const categoriesRoutes = require("./routers/categories");
const usersRoutes = require("./routers/user");
const ordersRoutes = require("./routers/orders");

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// database
mongoose
  .set("strictQuery", true)
  .connect(process.env.CONNECTION_STRING, {})
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

// server
app.listen(3000, () => {
  console.log(api);
  console.log("server is running http://localhost:3000");
});
