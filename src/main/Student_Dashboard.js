import React, {Component} from 'react';
import {Navigation} from "../Navigation";
import '../App.css';
import survey from '../images/image2.png'
import tracker from '../images/image1.png'
import policies from '../images/image0.png';

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
                        <span className="dot"><img src={tracker} alt={"globe icon"} /></span>
                        <span className="dot"><img src={policies} alt={"policies icon"} /></span>
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