const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();

require("./database/database"); // Conexão com banco de dados

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(routes);

app.listen(3333);
