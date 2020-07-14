import React, { Component } from "react";
import fire from "../config/fire"

var db = fire.database();

// get student list, classroom list, and profiles from database
var student_list;
var classroom_list;
var student_profiles;

// style for each students' status card
var card_style = {
    border: "1px solid black",
    padding: "5px",
    marginBottom: "5px"
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

        output.push(
            <div style={card_style}>
                {i}<br />
                Symptoms: {symptoms}<br />
                {slack_warning}
            </div>
        );
    }
    return output;
}

class Admin_Dashboard extends Component {
    state = {
        dataToLoad: 3
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
    }

    render() {
        return (
            <div>
                <h1>Admin Dashboard</h1>
                <h2>School: Bellarmine College Preparatory</h2>
                {generateTable()}
            </div>
        )
    }
}

export default Admin_Dashboard