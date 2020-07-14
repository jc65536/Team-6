/*
import React from 'react';
var firebase = require("firebase/app");
require("firebase/database");

var config = {
    apiKey: "AIzaSyAk25emmsGGVuaACxiQi8YIG5ymury6zmw",
    authDomain: "covid-proj-31f67.firebaseapp.com",
    databaseURL: "https://covid-proj-31f67.firebaseio.com",
    projectId: "covid-proj-31f67",
    storageBucket: "covid-proj-31f67.appspot.com",
    messagingSenderId: "238699515447",
    appId: "1:238699515447:web:df9fe8414a9999b7df39b2",
    measurementId: "G-M8KVXCVNN9"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

var db = firebase.database();

class DatabaseTest extends React.Component {
    database_init() {
        db.ref().set({
            schoolNames: ["Bellarmine College Preparatory", "Piedmont Hills High School", "William Mason High School"],
            schoolMnemonics: ["BCP", "PHHS", "WMHS"],
            classrooms: {
                "BCP": ["1A", "1B", "1C", "2A", "2B", "2C", "3A", "3B", "3C"],
                "PHHS": [],
                "WMHS": []
            },
            students: {
                "BCP": ["Samuel Sovi", "Jonathan Joestar", "Robert Speedwagon", "Erina Pendleton"],
                "PHHS": [],
                "WMHS": [],
            }
        });
    }

    render() {
        var big = {
            width: "500px",
            height: "500px",
        }
        return (
            <div>
                <button id="test" onClick={this.database_init} style={big}>Click</button>
            </div>
        )
    }
}

export default DatabaseTest;
*/
