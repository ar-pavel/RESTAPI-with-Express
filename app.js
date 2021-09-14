const express = require('express')
const routes = require('./routes/Routes')

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

app.use(routes)

// set port, listen for requests
const PORT = process.env.PORT || 8081;

app.listen(PORT, ()=> console.log("SERVER IS RUNNING AT PORT:", PORT));
