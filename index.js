require("dotenv").config();

const app = require("./app")

// set port, listen for requests (no port for testing, only in production)
const PORT = process.env.PORT ? process.env.PORT : 8081;

app.server = app.listen(PORT, ()=> console.log("SERVER IS RUNNING AT PORT:", PORT));
