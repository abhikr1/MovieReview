import React, { Component } from "react";
import LoginPage from "./LoginPage";
import "./Popup2.css";
class PopUp2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      review: "",
      errormessage : ""
    };
  }
  handleClick = () => {
    this.props.toggle();
  };
  onInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if(event.target.value){
        this.setState({errormessage: ""})
    }
    console.log(event.target.value);
    
        
  };

  submitReview = (e) => {
    e.preventDefault();
    if(this.state.value && this.state.review){
        console.log("Hello inside Submit Click");
        console.log(this.state.value);
        console.log(this.state.review)
        fetch(this.props.fetchApi, {
          method: "POST",
          body: JSON.stringify({
            user_rating: this.state.value,
            user_review: this.state.review,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response.error)
            this.setState({errormessage : response.error})
            else
            window.location.reload();
        })
    }
    else{
        this.setState({errormessage: "Review and Rating both are mandatory"})
    }
}


    //           response.json())         
    //         .then((json) => {
    //             if(json.error)
    //             this.setState({errormessage : json.error})
    //             else{
    //                 //window.location.reload();
    //                 console.log("Reload kroooo")
    //             }
    //         })
    // }

//     .then((response) =>
//     // if(response.ok){
//     //     window.location.reload();
//     //     return;
//     // }
//   response.json())
  
// .then((json) => {
//     if(json.error)
//     this.setState({errormessage : json.error})
//     else
//     window.location.reload();
//     console.log(json)})
// }




     // .then((response) => window.location.reload())
  togglePop = () => {
    this.setState({
      openPopup: !this.state.openPopup,
    });
  };

  render() {
    return (
      <div className="popup1">
        <div className="popup-inner1">
          <div>
            <button className="close-button1" onClick={this.handleClick}>
              X
            </button>
          </div>
          <div className="reviewPop">
          <form>
            <br></br>

            <div className="reviewtext">Rate and write a review</div>
            <hr></hr>
            <div className="reviewentity">
              <input
                className="labelInput"
                type="text"
                required="required"
                placeholder="Write a Review"
                name="review"
                onInput={this.onInput}
              />
            </div>
            <div className="reviewentity">
              <label for="movie" >
                <span className="ratingList"> Rate this movie : </span>
                <select
                  value={this.state.value}
                  onChange={this.onInput}
                  name="value"
                  className= "dropdown"
                >
                 <option value="value" hidden selected>Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </label>
            </div>
          </form>

          <div className="reviewentity">
            <input
              type="submit"
              className="submitBtn"
              onClick={this.submitReview}
              value="Submit Review"
            />
            </div>
            {this.state.errormessage ? <div className="errorReview">{this.state.errormessage}</div> : null}
          
        </div>
        </div>
      </div>
    );
  }
}
export default PopUp2;
