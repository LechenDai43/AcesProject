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
    })
}

exports.register = (req, res) => {

}

exports.checkValidation = (req, res) => {

}

exports.forgetPassword = (req, res) => {

}

exports.resetPassword = (req, res) => {

}
