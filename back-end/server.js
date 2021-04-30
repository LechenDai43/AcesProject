const db = require("./configure/db.configure").db;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// var corsOptions = {
//     origin: "http://ec2-18-207-128-58.compute-1.amazonaws.com:3000"
// };
// app.use(cors(corsOptions));
app.use(cors());

// import routes
require("./router/Task.router")(app);
const sha256 = require('js-sha256');
sha256('wjkdxmd');
let hash = sha256.create();
// start the server
console.log(db)
let header = "wjkatzuishuailedotcom";


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
