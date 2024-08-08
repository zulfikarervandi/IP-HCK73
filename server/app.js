if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}   
const express = require("express");
const app = express();
const port = 3000;
const router = require("./router/router.js");
const errorHandler = require("./middleWare/errorHandler.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
// app.listen(port, () => {
//   console.log(`Yuhuu jalan di port ${port}`);
// });

app.use(errorHandler);

module.exports = app;
