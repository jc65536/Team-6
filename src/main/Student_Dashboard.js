import React, {Component} from 'react';
import {Navigation} from "../Navigation";
import '../App.css';
import survey from '../images/survey_icon.png'


export class Student_Dashboard extends Component {
    render() {
        return (
            <div className={"sd-div"}>
                <header>
                    <Navigation/>
                </header>
                <main className={"home-main"}>
                    <div>
                        <span className="dot" onClick={()=>{
                            window.location.assign("/covid19_form")
                        }}><img src={survey} alt={"survey icon"} /></span>
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