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
/*
var school_names;
db.ref("schoolNames").once("value").then(function(data) {
    school_names = data.val();
    console.log(school_names);
});
function make_item(x) {
    return <option>{x}</option>;
}
*/

class Form extends React.Component {

    submit_form() {
        // gets values of name, cough, and temp fields
        var name = $("input[name=name]").val();
        var cough = $("input[type=radio][name=cough]:checked").val(); // jquery selectors filter through only checked radio buttons named cough
        var temp = $("input[type=radio][name=temp]:checked").val();   // same here
        var mental = $("input[type=radio][name=mental]:checked").val();   // same here
        console.log(name);
        console.log(cough);
        console.log(temp);
        console.log(mental);
        db.ref("studentProfiles/BCP/" + name).set({
            cough: cough,
            temp: temp,
            mental: mental
        });
        alert("Thank you for completing this form");
    }

    render() {
        return (
            <form onSubmit={this.submit_form}>
                <div>
                    <label>What's your name?</label><br/>
                    <input name="name" id="name"></input>
                </div>
                <div>
                    <label>Do you have a cough?</label><br/>
                    <input type="radio" name="cough" value="y"></input>
                    <label>Yes</label>
                    <input type="radio" name="cough" value="n"></input>
                    <label>No</label>
                </div>
                <div>
                    <label>Have you had a temperature recently?</label><br/>
                    <input type="radio" name="temp" value="y"></input>
                    <label>Yes</label>
                    <input type="radio" name="temp" value="n"></input>
                    <label>No</label>
                </div>
                <div>
                    <label>Are you mentally unstable?</label><br/>
                    <input type="radio" name="mental" value="y"></input>
                    <label>Yes</label>
                    <input type="radio" name="mental" value="n"></input>
                    <label>No</label>
                </div>
                <input type="submit" value="Submit"></input>
            </form>
        )
    }
}

export default Form;