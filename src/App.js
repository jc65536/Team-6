import React from "react";
import "./App.css";
import { Student_Dashboard } from "./main/Student_Dashboard";
import Admin_Dashboard from "./admin/Admin_Dashboard";
import { Login } from "./main/Login";
import Form from "./main/Form";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path={"/"} component={Login} />
                <Switch>
                    <Route path={"/student_dashboard"} component={Student_Dashboard} />
                    <Route path={"/admin_dashboard"} component={Admin_Dashboard} />
                    <Route path={"/covid19_form"} component={Form} />
                </Switch>
            </Router>
        )
    }
}

export default App;
