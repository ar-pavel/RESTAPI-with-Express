require("dotenv").config();
const express = require('express')
const routes = require('./routes/Routes')

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

app.use(routes)

// set port, listen for requests (no port for testing, only in production)
const PORT = process.env.PORT ? process.env.PORT : null;;

app.server =app.listen(PORT, ()=> console.log("SERVER IS RUNNING AT PORT:", PORT));

module.exports = app;