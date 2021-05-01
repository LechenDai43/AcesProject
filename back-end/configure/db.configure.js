const Firebase = require("firebase");

const firebaseConfig = {
    apiKey: 'AIzaSyBEYfi35nrkILjJ2JjKKQkTWkJp2mvmNvI',
    authDoman: 'aces-wjkdxmd.firebaseapp.com',
    databaseURL: 'https://aces-wjkdxmd-default-rtdb.firebaseio.com',
    projectId: 'aces-wjkdxmd',
    storageBucket: 'aces-wjkdxmd.appspot.com',
    appId: "1:939237501577:android:451a64c273c31b13257458"
};

const fbapp = Firebase.initializeApp(firebaseConfig);
const database = fbapp.database();
exports.db = database;
