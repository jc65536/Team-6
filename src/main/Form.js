import React from 'react';
import $ from "jquery";
import {Navigation} from "../Navigation";
import body from '../images/body.jpg'
import '../App.css';
import rightArm from '../images/HL_RighArm.PNG'
import leftArm from '../images/HL_LeftArm.PNG'
import chest from '../images/HL_Chest.PNG';
import head from '../images/HL_Head.png'
import throat from '../images/HL_Throat.PNG';
import stomach from '../images/HL_Stomach.PNG';
import legs from '../images/HL_Legs.PNG';

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
    constructor() {
        super();
        this.state = {
            leftArm: false,
            rightArm: false,
            legs: false,
            stomach: false,
            chest: false,
            head: false,
            throat: false,
        }
    }

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
            <div className={"FORMJS"}>
                <Navigation/>

                <form onSubmit={this.submit_form} className={"form"}>
                    <div className={"left"}>
                        <div className={"leftside-form"}>
                            <label>What's your name?</label><br/>
                            <input name="name" id="name"/>
                        </div>
                        <div className={"leftside-form"}>
                            <label>Do you have a cough?</label><br/>
                            <input type="radio" name="cough" value="y"/>
                            <label>Yes</label>
                            <input type="radio" name="cough" value="n"/>
                            <label>No</label>
                        </div>
                        <div className={"leftside-form"}>
                            <label>Have you had a temperature recently?</label><br/>
                            <input type="radio" name="temp" value="y"/>
                            <label>Yes</label>
                            <input type="radio" name="temp" value="n"/>
                            <label>No</label>
                        </div>
                        <div className={"leftside-form"}>
                            <label>Are you sneezing?</label><br/>
                            <input type="radio" name="mental" value="y"/>
                            <label>Yes</label>
                            <input type="radio" name="mental" value="n"/>
                            <label>No</label>
                        </div>
                        <input type="submit" value="Submit"/>
                    </div>
                    <div className={"right"}>
                        <img src={body} useMap="#image-map" alt={"body"} className={"right-body"}/>
                        <map name="image-map">
                            {/*Arms*/}
                            <div style={{position: "relative"}}>
                                <area target="_blank" alt="Arm" title="Arm" onClick={() => {
                                    this.setState(prevState => (
                                            {
                                                leftArm: !prevState.leftArm
                                            }
                                        )
                                    );
                                }}
                                      coords="71,89,86,124,54,262,28,252" shape="poly"/>
                                {this.state.leftArm &&
                                <img className={"selectedBody leftArm"} src={leftArm} alt={"arms"} onClick={() => {
                                    this.setState(prevState => (
                                            {
                                                leftArm: !prevState.leftArm
                                            }
                                        )
                                    );
                                }}/>}


                                <area target="_blank" alt="Arm" title="Arm"
                                      onClick={() => {
                                          this.setState(prevState => (
                                                  {
                                                      rightArm: !prevState.rightArm
                                                  }
                                              )
                                          );
                                      }}
                                      coords="170,84,159,120,198,262,216,253" shape="poly"/>
                                {this.state.rightArm &&
                                <img className={"selectedBody rightArm"} src={rightArm} alt={"arms"} onClick={() => {
                                    this.setState(prevState => (
                                            {
                                                rightArm: !prevState.rightArm
                                            }
                                        )
                                    );
                                }}/>}

                                {/*Legs*/}
                                <area target="_blank" alt="Legs" title="Legs" onClick={() => {
                                    this.setState(prevState => (
                                            {
                                                legs: !prevState.legs
                                            }
                                        )
                                    );
                                }}
                                      coords="86,221,164,433" shape="rect"/>

                                {this.state.legs &&
                                <img src={legs} className={"selectedBody legs"} alt={"legs"} id={"legs"}
                                     onClick={() => {
                                         this.setState(prevState => (
                                                 {
                                                     legs: !prevState.legs
                                                 }
                                             )
                                         );
                                     }}/>}


                                {/*Stomach*/}
                                <area target="_blank" alt="Stomach" title="Stomach" onClick={() => {
                                    this.setState(prevState => (
                                            {
                                                stomach: !prevState.stomach
                                            }
                                        )
                                    );
                                }}
                                      coords="91,147,158,203" shape="rect"/>

                                {this.state.stomach &&
                                <img src={stomach} className={"selectedBody stomach"} alt={"stomach"} id={"stomach"}
                                     onClick={() => {
                                         this.setState(prevState => (
                                                 {
                                                     stomach: !prevState.stomach
                                                 }
                                             )
                                         );
                                     }}
                                />}


                                {/*Chest*/}
                                <area target="_blank" alt="Chest" title="Chest" onClick={() => {
                                    this.setState(prevState => (
                                            {
                                                chest: !prevState.chest
                                            }
                                        )
                                    );
                                }}
                                      coords="90,83,158,134" shape="rect"/>

                                {this.state.chest && <img src={chest} onClick={() => {
                                    this.setState(prevState => (
                                            {
                                                chest: !prevState.chest
                                            }
                                        )
                                    );
                                }} className={"selectedBody chest"} alt={"chest"} id={"chest"}/>}


                                {/*Throat*/}
                                <area target="_blank" alt="Throat" title="Throat" onClick={() => {
                                    this.setState(prevState => (
                                            {
                                                throat: !prevState.throat
                                            }
                                        )
                                    );
                                }}
                                      coords="110,60,138,72" shape="rect"/>

                                {this.state.throat && <img src={throat} onClick={() => {
                                    this.setState(prevState => (
                                            {
                                                throat: !prevState.throat
                                            }
                                        )
                                    );
                                }} className={"selectedBody throat"} alt={"throat"} id={"throat"}/>}


                                {/*Head*/}
                                <area target="_blank" alt="Head" title="Head" onClick={() => {
                                    this.setState(prevState => (
                                            {
                                                head: !prevState.head
                                            }
                                        )
                                    );
                                }}
                                      coords="108,16,138,29" shape="rect"/>

                                {this.state.head &&
                                <img src={head} className={"selectedBody head"} onClick={() => {
                                    this.setState(prevState => (
                                            {
                                                head: !prevState.head
                                            }
                                        )
                                    );
                                }}
                                     alt={"head"} id={"head"}/>}
                            </div>

                        </map>
                    </div>

                </form>
            </div>
        )
    }
}

export default Form;