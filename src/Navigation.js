import React, {Component} from 'react';
import {Link} from "react-router-dom";
import logo from './images/logo.png'

export class Navigation extends Component {
    render() {
        return (
            <div>
                <Link to={"/student_dashboard"}>
                    <nav className={"nav-nav"}>
                        <img src={logo} alt={'SafeSchool Logo'} id="nav-logo"/>
                    </nav>
                </Link>
            </div>

        )
    }
}