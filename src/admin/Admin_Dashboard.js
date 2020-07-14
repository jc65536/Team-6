/*
import React, {Component} from "react";
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

var allready = 3;           // counter, please don't mind my programming practices

var db = firebase.database();

// get student list, classroom list, and profiles from database
var student_list;
db.ref("students/BCP").once("value").then(function(data) {
    student_list = data.val();
    console.log(student_list);
    allready--;
});

var classroom_list;
db.ref("classrooms/BCP").once("value").then(function(data) {
    classroom_list = data.val();
    console.log(classroom_list);
    allready--;
});

var student_profiles;
db.ref("studentProfiles/BCP").once("value").then(function(data) {
    student_profiles = data.val();
    console.log(student_profiles);
    allready--;
});

function generateTable() {
    var output = [];
    for (var i in student_profiles) {
        output.push(
            <div>
                {i.cough}<br/>
            </div>
        );
    }
    return output;
}

class Admin_Dashboard extends Component {
constructor() {
super();
this.state = {
school_name: "Mason High School"
}


function() {
some call
this.setState({
school_name:
}

    render() {
        return (
            <div>
                <h1>Admin Dashboard</h1>
                <h2 onMouseMove={this.function}>School:{this.state.school_name}</h2>


                {generateTable()}
            </div>
        )
    }
}

export default Admin_Dashboard*/
