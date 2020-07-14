// import React, {Component} from 'react';
// import '../App.css';
//
//
// class Form extends Component {
//     render() {
//         return (
//             <div>
//                 <form>
//                     <iframe
//                         src="https://docs.google.com/forms/d/e/1FAIpQLSfpQjmRZ3CwXlBPozepV-23gCxqudVpZmg0j7M8CBR1fYJxOQ/viewform?embedded=true"
//                         width="640" height="938" frameBorder="0" marginHeight="0" marginWidth="0"
//                         className={"form-google"}>Loading…
//                     </iframe>
//                 </form>
//             </div>
//         )
//     }
// }
//
// export default Form;

import React from 'react';
import $ from "jquery";
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

// gets a list of student names for "security" to check against
var student_roster;
db.ref("students/BCP").once("value").then(function (data) {
    student_roster = data.val();
});

class Form extends React.Component {
    submit_form() {
        // gets values of name, cough, and temp fields
        var name = $("input[name=name]").val();
        var cough = $("input[type=radio][name=cough]:checked").val();       // jquery selectors filter through only checked radio buttons named cough
        var temp = $("input[type=radio][name=temp]:checked").val();         // same here
        var mental = $("input[type=radio][name=mental]:checked").val();     // same here

        // "security"
        if (student_roster.includes(name)) {
            console.log(name);
            console.log(cough);
            console.log(temp);
            console.log(mental);
            // writes variables to student profile under the student name
            db.ref("studentProfiles/BCP/" + name).set({
                symptoms: {
                    cough: cough,
                    temp: temp,
                    mental: mental
                },
                lastUpdate: new Date().getTime()                            // lastUpdate key stores the last time the survey was taken. In the admin dashboard the admin can see any students whose lastUpdate was more than 24 hr ago, enabling them to ban such students.
            });
            alert("Thank you for completing this form");
        } else {
            alert("You are not a student at Bellarmine College Preparatory.");
        }
    }

    render() {
        return (
            <form onSubmit={this.submit_form}>
                <div>
                    <label>What's your name?</label><br />
                    <input name="name" id="name"/>
                </div>
                <div>
                    <label>Do you have a cough?</label><br />
                    <input type="radio" name="cough" value="y"/>
                    <label>Yes</label>
                    <input type="radio" name="cough" value="n"/>
                    <label>No</label>
                </div>
                <div>
                    <label>Have you had a temperature recently?</label><br />
                    <input type="radio" name="temp" value="y"/>
                    <label>Yes</label>
                    <input type="radio" name="temp" value="n"/>
                    <label>No</label>
                </div>
                <div>
                    <label>Are you mentally unstable?</label><br />
                    <input type="radio" name="mental" value="y"/>
                    <label>Yes</label>
                    <input type="radio" name="mental" value="n"/>
                    <label>No</label>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

export default Form;