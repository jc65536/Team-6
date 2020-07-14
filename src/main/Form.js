import React, {Component} from 'react';
import '../App.css';


class Form extends Component {
    render() {
        return (
            <div>
                <form>
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSfpQjmRZ3CwXlBPozepV-23gCxqudVpZmg0j7M8CBR1fYJxOQ/viewform?embedded=true"
                        width="640" height="938" frameBorder="0" marginHeight="0" marginWidth="0"
                        className={"form-google"}>Loading…
                    </iframe>
                </form>
            </div>
        )
    }
}

export default Form;