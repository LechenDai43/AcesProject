const db = require("../configure/db.configure");

// req.body 需要有 email 和 task_id
// task_id 可以为空
exports.retrieveTask = (req, res) => {
    let email = req.body.email;
    let header = email.replace('@', 'at').replace('.', 'dot');
    if (!req.body.task_id) {
        db.ref('/' + header + "_task").on('value', querySnapShot => {
            let data = querySnapShot.val();
            res.send(data);
        });
    }
    else {
        db.ref('/users').on('value', querySnapShot => {
            let data = querySnapShot.val();
            if (data[req.body.task_id]) {
                res.send(data[req.body.task_id]);
            }
            else {
                res.send({'status': 404})
            }
        });
    }
}

// req.body 需要有 email 和 task_id
exports.deleteTask = (req, res) => {
    let email = req.body.email;
    let header = email.replace('@', 'at').replace('.', 'dot');
    let id = req.body.task_id;
    db.ref('/' + header + "_task/" + id).remove();
}

// req.body 需要有 username 和 task
exports.createTask = (req, res) => {
    let email = req.body.email;
    let header = email.replace('@', 'at').replace('.', 'dot');
    let newItem = {
        'deadline': {
            'day': req.body.day,
            'month': req.body.month,
            'year': req.body.year
        },
        'difficulty': req.body.difficulty,
        'duration': req.body.duration,
        'failed': req.body.failed,
        'overdue': req.body.overdue,
        'progress': req.body.progress,
        'status': req.body.status,
        'title': req.body.title
    };
    db.ref('/' + header + '_task').push(newItem);
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
