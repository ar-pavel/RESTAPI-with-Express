const express = require('express')
const routes = require('./routes/Routes')

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

app.use(routes)

module.exports = app;