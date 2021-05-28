/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import "./MovieDetailPage.css";
import PopUp2 from "./PopUp2.js";
import PopUp from "./PopUp.js";
import NavBar from "./NavBar";
class MovieDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: { reviews: [] },
      value: "",
      review: "",
      openPopup: "",
      signedUp: "",
      youtube : ""
    };
  }
  componentDidMount() {
    fetch(`/api/${this.props.match.url}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ movie: response });
      });
    console.log("Indide component did mount of nav bar .js");
    fetch(`/api/sessions/ifexist/`).then((response) => {
      console.log(response);
      if (response.ok) {
        this.setState({ signedUp: true });
      } else {
        this.setState({ signedUp: false });
      }
    });
    console.log(this.state.signedUp);
    const temp = process.env.API_KEY;
    fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`)
    .then(
        response => response.json())
        .then((response) => {
            this.setState({youtube : response.results[0].key})
        })
  }

  onInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  submitReview = (e) => {
    e.preventDefault();
    console.log("Hello inside Submit Click");
    fetch(`/api/userRatings/${this.props.match.params.movieId}`, {
      method: "POST",
      body: JSON.stringify({
        user_rating: this.state.value,
        user_review: this.state.review,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => console.log(response));
  };
  togglePop = () => {
    this.setState({
      openPopup: !this.state.openPopup,
    });
  };

  render() {
      let url = `https://www.youtube.com/embed/${this.state.youtube}`;
    let signedUp = this.state.signedUp;
    let abc;
    if (signedUp) {
      abc = (
        <PopUp2
          toggle={this.togglePop}
          fetchApi={`/api/userRatings/${this.props.match.params.movieId}`}
        ></PopUp2>
      );
    } else {
      abc = <PopUp toggle={this.togglePop}></PopUp>;
    }
    return (
      <div class = "bgcolor">
          <NavBar/>
        <div class="details">
        <div>
        <h1>{this.state.movie.original_title}</h1>
        </div>
        <div>
        <iframe
          width="1150"
          height="400"
          src={url}
        titile = "a" ></iframe>
        </div>
        <div className="overview">{this.state.movie.overview}</div>
        <div>

        <span className="overview2" style = {{padding: "3px"}}>
            
          Rating : {this.state.movie.vote_average}
          </span>
          <svg
            width="13"
            height="13"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="yellow"
          >

            <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
          </svg>
          </div>

        <div  className="overview2" id ="wrtitereview" onClick={this.togglePop}>
        <span className="overview2" id="writereview" style = {{padding: "3px"}}>
          Rate and Write a review
          </span>
          <svg
            width="13"
            height="13"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="yellow"
          >

            <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
          </svg>
        </div>
        
        <div>
        {this.state.openPopup ? abc : null}
        <hr></hr>
        <h2>Reviews</h2>
        </div>
        <div>
        {this.state.movie.reviews.map((item) => (
          <div>
            <div class ="reviewText">{item.review}</div>
          </div>
        ))}
        </div>
        </div>
      </div>
    );
  }
}
export default MovieDetailPage;
