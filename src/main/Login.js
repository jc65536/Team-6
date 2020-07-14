import React, {Component} from 'react';
import {Navigation} from '../Navigation';
import fire from '../config/fire';
import '../App.css'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.state = {
            email: '',
            password: '',
            isIncorrect: false,
        };
        this.handleError = this.handleError.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log(u);
            window.location.assign("/student_dashboard")
        }).catch((error) => {
            console.log(error);
        });
    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).then((u) => {
            console.log(u);
            window.location.assign("/student_dashboard")
        })
            .catch((error) => {
                console.log(error);
            })
    }

    googleSignIn(e) {
        e.preventDefault();
        var provider = new fire.auth.GoogleAuthProvider();
        fire.auth().signInWithPopup(provider).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
            /*var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;*/
        });
    }

    handleError() {
        this.setState({
            isIncorrect: true,
        })
    }

    render() {
        return (
            <div className={"login-div"}>
                <Navigation/>
                <div className={"login-div-div"}>
                    <form className={"login-form"}>
                        <label className={"login-label"}>
                            Email address:
                            <input value={this.state.email}
                                   onChange={this.handleChange}
                                   type="email"
                                   name="email"
                                   placeholder="Enter email"/>
                        </label>
                        <label className={"login-label"}>
                            Password:
                            <input value={this.state.password}
                                   onChange={this.handleChange}
                                   type="password"
                                   name="password"
                                   placeholder="Password"/>
                        </label>
                        <button type="submit" onClick={this.login} className={"login-button"}>Login</button>
                        <button onClick={this.signup} className={"login-button"}>Signup</button>
                    </form>

                </div>
            </div>
        );
    }
}
