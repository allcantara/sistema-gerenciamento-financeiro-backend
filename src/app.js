const express = require("express");
const { json, urlencoded } = require("body-parser");
const { errors } = require("celebrate");
const cors = require("cors");
const routes = require("./routes");

const app = express();

require("./database/database");
// require("./database/database_test"); // Database para realizar os testes

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(routes);
app.use(errors());

module.exports = app;
