import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import NavBar from "./NavBar.js";
import Banner from "./Banner.js";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }
  componentDidMount() {
    fetch(`/api/movies?page=0`)
      .then((response) => response.json())
      .then((response) => {
        //console.log(response.movies);
        this.setState({ totalPages: response.totalPages });
        this.setState({ movies: response.movies });
      });
  }

  render() {
    console.log(this.state.movies);
    return (
      <div class="complete">
        <div>
          <NavBar />

          <Banner />
          <div class="grid-container1">
            {this.state.movies.map((item) => (
              <div>
                <Link to={`/movies/${item.id}`} className="link">
                  <div class="grid-item1">
                    <img
                      src={item.poster_path}
                      alt="null"
                      height="380px"
                      width="320px"
                    />
                    <div className="homeEntity">
                      {item.vote_average}
                      <span>                                                    </span>
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
                    <div className="homeEntity">{item.original_title}</div>
                    <div className="homeEntity">{item.rate_count}</div>
                    <div className="homeEntity">Rlease Date : {item.release_date}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default HomePage;
