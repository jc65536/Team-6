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
    margin: "20px 0px",
    borderRadius: "10px",
    padding: "10px",
}

var symptom_map = {
    "temp": "Recent fever",
    "cough": "Coughs",
    "mental": "Mental health issues"
}

var riskColors = {
    0: {
        background: "linear-gradient(135deg, #00ff00, 3%, #ffffff 15%)"
    },
    1: {
        background: "linear-gradient(135deg, #ffff00, 3%, #ffffff 15%)"
    },
    2: {
        background: "linear-gradient(135deg, #ff0000, 3%, #ffffff 15%)",
        fontWeight: "bold"
    }
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
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function generateTable() {
    var time = new Date().getTime();
    var output = [];
    var stats = [0, 0, 0];
    var total = 0;
    try {
        total = student_list.length;
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

        var contacts = "";
        if (symptoms.length > 1) {                              // more than 1 symptom = at risk (not the most scientific but works for now)
            contacts = "Contacted students: " + uniq(getContacts(i)).filter(value => value != i).join(", ");
        }

        var style = Object.assign({}, card_style, riskColors[Math.min(symptoms.length, 2)]);
        
        symptoms = symptoms.map(value => {
            return symptom_map[value];
        });

        stats[Math.max(0, 2-symptoms.length)]++;

        if (symptoms.length == 0) {
            symptoms = "none!";
        } else {
            symptoms = symptoms.join(", ");
        }

        output.push(
            <div style={style} id={i}>
                {i}<br />
                Symptoms: {symptoms}<br />
                {slack_warning}
                {contacts}
            </div>
        );
    }

    var critical_risk = (stats[0] / total * 100).toFixed(1);
    var moderate_risk = (stats[1] / total * 100).toFixed(1);
    var healthy = (stats[2] / total * 100).toFixed(1);
    var unknown = (100 - critical_risk - moderate_risk - healthy).toFixed(1);
    output.unshift(<div style={{border: "1px solid black", width: "30%", padding: "10px", borderRadius: "10px"}}>
        <h3>Breakdown:</h3>
        <span style={{width: "calc(100% - 10px)", display: "inline-block", padding: "5px", background: "linear-gradient(90deg, #ff0000, 5%, #ffffff " + critical_risk + "%)" }}>Critical symptoms {critical_risk}%</span> <br/>
        <span style={{width: "calc(100% - 10px)", display: "inline-block", padding: "5px", background: "linear-gradient(90deg, #ffff00, 5%, #ffffff " + moderate_risk + "%)" }}>Moderate symptoms {moderate_risk}%</span> <br/>
        <span style={{width: "calc(100% - 10px)", display: "inline-block", padding: "5px", background: "linear-gradient(90deg, #00ff00, 5%, #ffffff " + healthy + "%)" }}>Healthy {healthy}%</span> <br/>
        <span style={{width: "calc(100% - 10px)", display: "inline-block", padding: "5px", background: "linear-gradient(90deg, #666666, 5%, #ffffff " + healthy + "%)" }}>Unknown {unknown}%</span>
    </div>)
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
            <div style={{
                padding: "40px"
            }}>
                <h1>Admin Dashboard</h1>
                <h3>School: Bellarmine College Preparatory</h3>


                {generateTable()}
            </div>
        )
    }
}

export default Admin_Dashboard
