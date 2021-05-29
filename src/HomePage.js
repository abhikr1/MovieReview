import React from "react";
import "./HomePage.css";
import NavBar from "./NavBar.js";
import Banner from "./Banner.js";
import MovieList from './MovieList.js'
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchresult : []
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

getSearchresult = (movieresults) => {
  if(movieresults.length > 0) 
    this.setState({movies : movieresults})
  else
  this.componentDidMount();
  
}
  render() {
    console.log(this.state.movies);
    return (
      <div class="complete">
        <div>
          
          <NavBar getSearchresult = {this.getSearchresult}/>
          <Banner />

            <MovieList movies={this.state.movies}/>
          </div>
      </div>
    );
  }
}
export default HomePage;
