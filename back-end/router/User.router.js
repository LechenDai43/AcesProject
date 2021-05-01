module.exports = app => {
    const user = require("../controller/User.controller");
    let router = require("express").Router();

    router.put("/", user.login);
    router.post("/", user.register);

    app.use("/aces/user", router);
}
