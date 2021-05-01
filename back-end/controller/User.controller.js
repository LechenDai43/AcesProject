const db = require("../configure/db.configure");

exports.login = (req, res) => {
    let key = req.body.username;
    let keyType = '';
    if (key.includes('@')) {
        keyType = 'email';
    }
    else {
        keyType = 'username'
    }
    db.ref('/users').on('value', querySnapShot => {
        let data = querySnapShot.val();
        data.forEach((item) => {
            if (item[keyType] === key) {
                let result = {
                    'email': item['email'],
                    'password': item['password']
                };
                res.send(result);
                return;
            }
        });
    });
}

exports.register = (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let valid = 1;
    db.ref('/users').on('value', querySnapShot => {
        let data = querySnapShot.val();
        data.forEach((item) => {
            if (item['username'] === username && email === item['email']) {
                valid = 0;
                return;
            }
        });
    });

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
            'table': header + "_task"
        },
        'time': {
            'day': -1,
            'hour': -1,
            'month': -1,
            'year': -1
        }
    });
}

exports.forgetPassword = (req, res) => {

}

exports.resetPassword = (req, res) => {

}
