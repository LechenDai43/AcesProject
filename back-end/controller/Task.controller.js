const db = require("../configure/db.configure");

// req.body 需要有 username 和 task_id
// task_id 可以为空
exports.retrieveTask = (req, res) => {

}

// req.body 需要有 username 和 task_id
exports.deleteTask = (req, res) => {

}

// req.body 需要有 username 和 task
exports.createTask = (req, res) => {

}

// modify the task
exports.modifyTask = (req, res) => {

}

// The following is for status

exports.changeStatus = (req, res) => {

}

exports.getStatus = (req, res) => {

}

// The following is for schedule

exports.setEstimateTime = (req, res) => {

}

exports.getEstimateTime = (req, res) => {

}

exports.getTimeSlots = (req, res) => {

}

exports.addTimeSlots = (req, res) => {

}

exports.deleteTimeSlots = (req, res) => {

}

exports.changeSlotStatus = (req, res) => {

}

// The following is for due date

exports.getDueDate = (req, res) => {

}

exports.setDueDate = (req, res) => {

}

// The following is for estimate difficulty

exports.getEstimateDifficulty = (req, res) => {

}

exports.setEstimateDifficulty = (req, res) => {

}
