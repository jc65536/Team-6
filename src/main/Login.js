import React, {Component} from 'react';
import {Navigation} from '../Navigation';
import fire from '../config/fire';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
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
            window.location.assign("/home")
        }).catch((error) => {
            console.log(error);
        });
    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).then((u) => {
            console.log(u);
            window.location.assign("/home")
        })
            .catch((error) => {
                console.log(error);
            })
    }

    handleError() {
        this.setState({
            isIncorrect: true,
        })
    }

    render() {
        return (
            <div>
                <Navigation/>
                <form>
                    <label>
                        Email address:
                        <input value={this.state.email}
                               onChange={this.handleChange}
                               type="email"
                               name="email"
                               placeholder="Enter email"/>
                    </label>
                    <label>
                        Password:
                        <input value={this.state.password}
                               onChange={this.handleChange}
                               type="password"
                               name="password"
                               placeholder="Password"/>
                    </label>
                    <button type="submit" onClick={this.login}>Login</button>
                    <button onClick={this.signup}>Signup</button>
                </form>

            </div>
        );
    }
}
