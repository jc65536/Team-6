import React from 'react';
import './App.css';
import {Home} from "./main/Home";
import {Login} from "./main/Login";
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path={"/"} component={Login}/>
                <Switch>
                    <Route path={"/home"} component={Home}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
