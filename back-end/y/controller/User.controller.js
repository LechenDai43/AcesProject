const db = require("../configure/db.configure").db;

exports.login = (req, res) => {
    let key = req.body.username;
    let found = 0;
    if (key.includes('@')) {
        db.ref('/users').once('value', querySnapShot => {
            querySnapShot.forEach((i) => {
                let item = i.val();
                if (item.email === key) {
                    let result = {
                        'email': item.email,
                        'password': item.password
                    };
                    found = 1;
                    res.send(result);
                }
            });
        });
    }
    else {
        db.ref('/users').once('value', querySnapShot => {
            querySnapShot.forEach((i) => {
                let item = i.val();
                if (item.username === key) {
                    let result = {
                        'email': item.email,
                        'password': item.password
                    };
                    found = 1;
                    res.send(result);
                }
            });
        });
    }

}

exports.register = (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let valid = 1;
    db.ref('/users').once('value', querySnapShot => {
        querySnapShot.forEach((item) => {
            if (item.val().username === username && email === item.val().email) {
                valid = 0;
            }
        });

    });
    if (valid === 0) {
        res.send("invalid");
    } else {
        db.ref('/users').push({
            'username': username,
            'email': email,
            'password': password
        });
        let header = email.replace('@', 'at').replace('.', 'dot');
        db.ref('/' + header + "_task").push({
            'deadline': {
                'day': -1,
                'month': -1,
                'year': -1
            },
            'difficulty': -1,
            'duration': -1,
            'failed': -1,
            'overdue': -1,
            'progress': -1,
            'status': 'Null',
            'title': 'Null'
        });
        db.ref('/' + header + "_schedule").push({
            'task': {
                'id': -1,
                'title': 'Null'
            },
            'time': {
                'day': -1,
                'hour': -1,
                'month': -1,
                'year': -1
            }
        });
        res.send("valid");
    }
}

exports.forgetPassword = (req, res) => {

}

exports.resetPassword = (req, res) => {

}
