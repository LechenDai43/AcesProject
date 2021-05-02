const db = require("../configure/db.configure").db;

// req.body 需要有 email 和 task_id
// task_id 可以为空
exports.retrieveTask = (req, res) => {
    let email = req.body.email;
    let header = email.replace('@', 'at').replace('.', 'dot');
    if (!req.body.task_id) {
        db.ref('/' + header + "_task").once('value', querySnapShot => {
            let data = querySnapShot.val();
            res.send(data);
        });
    }
    else {
        db.ref('/' + header + "_task").once('value', querySnapShot => {
            let data = querySnapShot.val();
            if (data.req.body.task_id) {
                res.send(data.req.body.task_id);
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

// req.body 需要有 email 和 task
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
    let key = req.body.key;
    let email = req.body.email;
    let header = email.replace('@', 'at').replace('.', 'dot');
    let id = req.body.task_id;
    let rootRef = db.ref('/' + header + "_task/" + id);
    rootRef.child(key).set(req.body.value);
}

// The following is for status

exports.changeStatus = (req, res) => {
    console.log(req.body)
    let email = req.body.email;
    let header = email.replace('@', 'at').replace('.', 'dot');
    let id = req.body.task_id;
    let newState = req.body.status;
    let rootRef = db.ref('/' + header + "_task/" + id);
    rootRef.child('status').set(newState);
    if (newState === 'Failed') {
        db.ref('/' + header + "_task/" + id).child('failed').set(1);
    }
    else if (newState === 'Overdue') {
        db.ref('/' + header + "_task/" + id).child('failed').set(1);
        db.ref('/' + header + "_task/" + id).child('overdue').set(1);
    }
    else if (newState === "Freeze" || newState === "Requested") {
        db.ref('/' + header + "_task/" + id).child('duration').set(1);
        db.ref('/' + header + "_task/" + id).child('progress').set(1);
    }
    else if (newState === "Done") {
        db.ref('/' + header + "_task/" + id).child('progress').set(req.body.duration);
    }
}

exports.getStatus = (req, res) => {
    let email = req.body.email;
    let header = email.replace('@', 'at').replace('.', 'dot');
    db.ref('/' + header + "_task").once('value', querySnapShot => {
        let data = querySnapShot.val();
        if (data[req.body.task_id]) {
            res.send(data[req.body.task_id]['status']);
        }
        else {
            res.send({'status': 404})
        }
    });
}

// The following is for schedule

exports.setEstimateTime = (req, res) => {
    let email = req.body.email;
    let header = email.replace('@', 'at').replace('.', 'dot');
    let id = req.body.task_id;
    let newDuration = req.body.duration;
    let rootRef = db.ref('/' + header + "_task/" + id);
    rootRef.child('duration').set(newDuration);
}

exports.getEstimateTime = (req, res) => {
    let email = req.body.email;
    let header = email.replace('@', 'at').replace('.', 'dot');
    db.ref('/' + header + "_task").once('value', querySnapShot => {
        let data = querySnapShot.val();
        if (data[req.body.task_id]) {
            res.send(data[req.body.task_id]['duration']);
        }
        else {
            res.send({'status': 404})
        }
    });
}

exports.getTimeSlots = (req, res) => {
    let email = req.body.email;
    let header = email.replace('@', 'at').replace('.', 'dot');
    let day = req.body.day;
    let month = req.body.month;
    let year = req.body.year;
    db.ref('/' + header + '_schedule').once('value', querySnapShot => {
        let data = querySnapShot;
        let result = [];
        querySnapShot.forEach((subShot) => {
            let item = subShot.val();
            let time = item.time;
            if (time.day === day && time.month === month && time.year === year) {
                result.push(subShot);
            }
        });
        res.send(result);
    });
}

exports.addTimeSlots = (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let header = email.replace('@', 'at').replace('.', 'dot');
    let newItem = {
        'task': {
            'id': req.body.task_id,
            'title': req.body.title
        },
        'time': {
            'day': req.body.day,
            'month': req.body.month,
            'year': req.body.year,
            'hour': req.body.hour
        }
    };
    db.ref('/' + header + '_schedule').push(newItem);
}

exports.deleteTimeSlots = (req, res) => {
    console.log(req.body)
    let email = req.body.email;
    let day = req.body.day;
    let month = req.body.month;
    let year = req.body.year;
    let hour = req.body.hour;
    let header = email.replace('@', 'at').replace('.', 'dot');
    db.ref('/' + header + '_schedule').once('value', querySnapShot => {
        let data = querySnapShot.val();
        let key = '';
        let keys = Object.keys(data);
        keys.forEach((element) => {
            let item = data[element];
            let time = item.time;
            if (time.day === day && time.month === month && time.year === year && time.hour === hour) {
                key = element;
            }
        });
        console.log(key);
        if (key !== '') {
            db.ref('/' + header + "_schedule/" + key).remove();
        }
    });
}

exports.changeSlotStatus = (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let day = req.body.day;
    let month = req.body.month;
    let year = req.body.year;
    let hour = req.body.hour;
    let header = email.replace('@', 'at').replace('.', 'dot');
    db.ref('/' + header + '_schedule').once('value', querySnapShot => {
        let data = querySnapShot.val();
        let key = '';
        let keys = Object.keys(data);
        keys.forEach((element) => {
            let item = data[element];
            let time = item.time;
            if (time.day === day && time.month === month && time.year === year && time.hour === hour) {
                key = element;
            }
        });
        let rootRef = db.ref('/' + header + "_schedule/" + key + "/task");
        rootRef.child('id').set(req.body.task_id);
        rootRef.child('title').set(req.body.title);
    });
}

// The following is for due date

exports.getDueDate = (req, res) => {

}

exports.setDueDate = (req, res) => {
    let email = req.body.email;
    let header = email.replace('@', 'at').replace('.', 'dot');
    let id = req.body.task_id;
    let day = req.body.day;
    let month = req.body.month;
    let year = req.body.year;
    let rootRef = db.ref('/' + header + "_task/" + id + "/deadline");
    rootRef.child('day').set(day);
    rootRef.child('month').set(month);
    rootRef.child('year').set(year);

}

// The following is for estimate difficulty

exports.getEstimateDifficulty = (req, res) => {

}

exports.setEstimateDifficulty = (req, res) => {
    let email = req.body.email;
    let header = email.replace('@', 'at').replace('.', 'dot');
    let id = req.body.task_id;
    let diff = req.body.difficulty;
    let rootRef = db.ref('/' + header + "_task/" + id);
    rootRef.child('difficulty').set(diff);
}
