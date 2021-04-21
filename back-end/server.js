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


// start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
