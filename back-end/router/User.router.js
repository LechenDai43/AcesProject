module.exports = app => {
    const user = require("../controller/User.controller");
    let router = require("express").Router();

    router.put("/", user.login);
    router.post("/", user.register); 
    router.get("/:key", (req, res)=>{res.send("You are here")});

    app.use("/aces/user", router);
}
