const db = require("./configure/db.configure").db;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// var corsOptions = {
//     origin: "https://my-project-4261-312606.uc.r.appspot.com:3000"
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// import routes
require("./router/Task.router")(app);
require("./router/User.router")(app);
// start the server

const PORT = process.env.PORT || 8080;
console.log(PORT);
console.log(db);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
