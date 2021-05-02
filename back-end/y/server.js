const db = require("./configure/db.configure").db;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
    origin: "https://aces-wjkdxmd.web.app"
};
app.use(cors(corsOptions));
// app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// import routes
require("./router/Task.router")(app);
require("./router/User.router")(app);
// start the server

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
