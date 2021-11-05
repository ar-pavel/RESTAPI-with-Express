const express = require("express");
const routes = require("./routes/Routes");
const cors = require("cors");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

const initializer = require("./config/DBinitializer");

initializer(false);

app.use(routes);

module.exports = app;
