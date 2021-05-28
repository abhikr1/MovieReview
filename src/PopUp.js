import React, { Component } from "react";
import './Popup.css'
import LoginPage from './LoginPage.js'
class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  }

    render(){
    return(
        <div className="popup">
            <div className="popup-inner">
                <button className="close-button" onClick={this.handleClick}>X</button>
                <LoginPage checkLoggedIn = {this.props.toggl2}/>
                
            </div>
        </div>
    )
}
};
export default PopUp;