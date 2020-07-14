import React, { Component } from "react";
import fire from "../config/fire"

var db = fire.database();

// get student list, classroom list, and profiles from database
var student_list;
var classroom_list;
var student_profiles;
var class_roster;

// style for each students' status card
var card_style = {
    border: "1px solid black",
    padding: "5px",
    marginBottom: "5px"
}

function getContacts(risk_student) {
    var contacted = [];
    for (var j in class_roster) {
        var classroom = class_roster[j];
        if (classroom.includes(risk_student)) {
            contacted = contacted.concat(classroom);            // add whole classroom to contacted list
        }
    }
    return contacted;
}

// removes array duplicates
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function generateTable() {
    var time = new Date().getTime();
    var output = [];

    try {
        var absent = student_list.filter(name => !Object.keys(student_profiles).includes(name)); // gets a list of students whose info is not in db
        for (var i in absent) {
            output.push(
                <div style={card_style}>
                    {absent[i]} has never taken the survey, so no data is available!<br />
                    {slack_warning}
                </div>
            );
        }
    } catch (e) {
        console.error(e);
    }

    for (var i in student_profiles) {
        var profile = student_profiles[i];

        var symptoms = [];
        for (var j in profile.symptoms) {
            if (profile.symptoms[j] == "y") {
                symptoms.push(j);
            }
        }

        var slack_warning = "";
        if (time - profile.lasUpdate > 86400000) {              // 86400000 ms = 1 day
            slack_warning = "This student has not been completing the survey on time!"
        }

        if (symptoms.length == 0) {
            symptoms.push("none!");
        }

        var contacts = "";
        if (symptoms.length > 1) {                              // more than 1 symptom = at risk (not the most scientific but works for now)
            contacts = "Contacted students: " + uniq(getContacts(i)).join(", ");
        }

        symptoms = symptoms.join(", ")

        output.push(
            <div style={card_style} id={i}>
                {i}<br />
                Symptoms: {symptoms}<br />
                {slack_warning}
                {contacts}
            </div>
        );
    }
    return output;
}

class Admin_Dashboard extends Component {
    state = {
        dataToLoad: 4
    };

    componentDidMount() {
        this._asyncRequest = db.ref("students/BCP").once("value").then(data => {
            student_list = data.val();
            this._asyncRequest = null;
            this.setState((state) => {
                return { dataToLoad: --state.dataToLoad };
            });
        });
        this._asyncRequest = db.ref("classrooms/BCP").once("value").then(data => {
            classroom_list = data.val();
            this._asyncRequest = null;
            this.setState((state) => {
                return { dataToLoad: --state.dataToLoad };
            });
        });
        this._asyncRequest = db.ref("studentProfiles/BCP").once("value").then(data => {
            student_profiles = data.val();
            this._asyncRequest = null;
            this.setState((state) => {
                return { dataToLoad: --state.dataToLoad };
            });
        });
        this._asyncRequest = db.ref("classRosters/BCP").once("value").then(data => {
            class_roster = data.val();
            this._asyncRequest = null;
            this.setState((state) => {
                return { dataToLoad: --state.dataToLoad };
            });
        });
    }

    render() {
        return (
            <div>
                <h1>Admin Dashboard</h1>
                <h2 >School:</h2>


                {generateTable()}
            </div>
        )
    }
}

export default Admin_Dashboard
