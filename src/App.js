import React from 'react';
import fire from "./config/fire";
import './App.css';
import {Home} from "./Home";
import Login from "./Login";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            //console.log(user);
            if (user) {
                this.setState({user});
               // localStorage.setItem('user', user.uid);
            } else {
                this.setState({user: null});
                //localStorage.removeItem('user');
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.user ? (<Home/>) : (<Login/>)}
            </div>
        )
    }
}

export default App;
