import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAk25emmsGGVuaACxiQi8YIG5ymury6zmw",
    authDomain: "covid-proj-31f67.firebaseapp.com",
    databaseURL: "https://covid-proj-31f67.firebaseio.com",
    projectId: "covid-proj-31f67",
    storageBucket: "covid-proj-31f67.appspot.com",
    messagingSenderId: "238699515447",
    // appId: "1:238699515447:web:df9fe8414a9999b7df39b2",
    // measurementId: "G-M8KVXCVNN9"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const fire = firebase;

export default fire;