import React from 'react';
import './NavBar.css'

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value:''
        };
    }
        componentDidMount() {
            
        }
          onInput = event => {
            if(event.target.value){
            console.log(`/api/movies/search/${event.target.value}`)
            fetch(`/api/movies/search/${event.target.value}`)
            .then((response) => response.json())
            .then(response =>  this.props.searchmovieresult(response));
            }
            else{
                this.props.searchmovieresult([])
            }
           
        }

    render(){
    return (<div class="SearchBar">
      <div className="SearchIconWrapper"><img className="SearchIcon" src='/images/search-24px.svg' alt='searchIcon'/></div>
      {/* <input className="SearchInput" type="text" placeholder="Search for products, brands and more..." onChange={this.getText} ></input>  */}
      <input
                        className="search"
                        type="text"
                        placeholder="Search for movies..."
                        name="search"
                        onInput={this.onInput} 
                        value={this.state.search}
                    />
      </div>);
  }

getText(props){
    console.log("Idhar beta")
    console.log(props.nativeEvent.data);
    console.log(props)
  }
}
 export default SearchBar;