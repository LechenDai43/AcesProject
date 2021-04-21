module.exports = app => {
    const task = require("../controller/Task.controller");
    let router = require("express").Router();

    router.get("/", task.retrieveTask);
    router.delete("/", task.deleteTask);
    router.post("/", task.createTask);
    router.update("/", task.modifyTask);

    router.get("/status", task.getStatus);
    router.update("/status", task.changeStatus);

    router.post("/schedule/length", task.setEstimateTime);
    router.get("/schedule/length", task.getEstimateTime);

    router.get("/schedule/time", task.getTimeSlots);
    router.update("/schedule/time", task.changeSlotStatus);
    router.post("/schedule/time", task.addTimeSlots);
    router.delete("/schedule/time", task.deleteTimeSlots);

    router.get("/due", task.getDueDate);
    router.update("/due", task.setDueDate);

    router.get("/estimation", task.setEstimateDifficulty);
    router.update("/estimation", task.setEstimateDifficulty);

    app.use("/aces/task", router);
}
