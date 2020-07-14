import React, {Component} from 'react';
import {Navigation} from "../Navigation";
import '../App.css';


export class Home extends Component {
    render() {
        return (
            <div>
                <header>
                    <Navigation/>
                </header>
                <main className={"home-main"}>
                    <div>
                        <span className="dot"/>
                        <span className="dot"/>
                        <span className="dot"/>
                    </div>
                    <div>
                        <span className="dot"/>
                        <span className="dot"/>
                        <span className="dot"/>
                    </div>
                </main>
                <footer>

                </footer>
            </div>
        )
    }
}