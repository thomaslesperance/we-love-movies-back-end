if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  res.json({ data: { key: "123" } });
});

module.exports = app;
