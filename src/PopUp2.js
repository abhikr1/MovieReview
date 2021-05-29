import React, { Component } from "react";
import LoginPage from "./LoginPage";
import "./Popup2.css";
class PopUp2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  handleClick = () => {
    this.props.toggle();
  };
  onInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  submitReview = (e) => {
    e.preventDefault();
    console.log("Hello inside Submit Click");
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
      .then((response) => window.location.reload())
     
  };
  togglePop = () => {
    this.setState({
      openPopup: !this.state.openPopup,
    });
  };

  render() {
    console.log("inside popup222");
    console.log(this.props);
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

            <div className="reviewtext">Write a review</div>
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
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
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
        </div>
        </div>
      </div>
    );
  }
}
export default PopUp2;
