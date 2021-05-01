module.exports = app => {
    const task = require("../controller/Task.controller");
    let router = require("express").Router();

    router.put("/get", task.retrieveTask);
    router.delete("/", task.deleteTask);
    router.post("/", task.createTask);
    router.put("/", task.modifyTask);

    router.put("/status/get", task.getStatus);
    router.put("/status", task.changeStatus);

    router.post("/schedule/length", task.setEstimateTime);
    router.put("/schedule/length/get", task.getEstimateTime);

    router.put("/schedule/time/get", task.getTimeSlots);
    router.put("/schedule/time", task.changeSlotStatus);
    router.post("/schedule/time", task.addTimeSlots);
    router.delete("/schedule/time", task.deleteTimeSlots);

    router.put("/due/get", task.getDueDate);
    router.put("/due", task.setDueDate);

    router.put("/estimation/get", task.setEstimateDifficulty);
    router.put("/estimation", task.setEstimateDifficulty);

    app.use("/aces/task", router);
}
