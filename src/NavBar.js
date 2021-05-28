import React from 'react';
import './NavBar.css';
import PopUp from './PopUp.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function SearchBar(){
  return (<div class="SearchBar">
    <div className="SearchIconWrapper"><img className="SearchIcon" src='/images/search-24px.svg' alt='searchIcon'/></div>
    <input className="SearchInput" type="text" placeholder="Search for products, brands and more..."></input>

    </div>);
}
function LogoutButton(props){
  return (
    <button onClick={props.onClick}>
       Logout
    </button>
);
}
function LogInButton(props){
  return (
    <button onClick={props.onClick}>
       Login
    </button>
);
}
function LoginText(props){
  return(
    <div onClick = {props.onClick}>
        
    </div>
  )
}
class NavBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoggedIn : false,
        openPopup: false,
        signedUp: false
    };

  }

  handleLogoutClick = () => {
//     
     this.setState({isLoggedIn : false});
  }
  handleLogInClick = () => {
      this.setState({isLoggedIn : true});

 }
 togglePop = () => {
  this.setState({
    openPopup: !this.state.openPopup
  });
};
 logoclick = () => {
  return(
    window.location = '/'
  )

}

signOut = () => {
  fetch('/api/sessions/me', {
    method: 'DELETE'
  }).then(res => {
    if (res.status === 204) {
      this.setState({signedUp: false})
    }
  });
}

componentDidMount(){
  console.log("Indide component did mount of nav bar .js")
  fetch(`/api/sessions/ifexist/`).then(
    response => {
      console.log(response);
      if(response.ok){
        this.setState({signedUp:true});
        
      }
      else{
        this.setState({signedUp: false});
      }

    }
  )
  console.log(this.state.signedUp)
}
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    // if(isLoggedIn)
    // button = <LogoutButton onClick ={this.handleLogoutClick}/>
    // else
    // button = <LogInButton onClick ={this.handleLogInClick}/>
    let loginInfo;
    if(this.state.signedUp){
        // loginInfo = <LoginText onClick={this.handleLogin}/>
        console.log("User signed up");
        loginInfo = <div className = "btn" onClick={this.signOut}>Logout</div>
        //window.location.reload();
    }
    else{
      loginInfo = <div className="btn" onClick={this.togglePop}>Login/SignUp</div>
    }
    return (
          <div class = "navbar">
            <div class="companyLogo" onClick={this.logoclick}><img src = "/images/logo3.png" width = "40" height = "40" alt =""/></div>
            <div>
              <SearchBar/>
            </div>
            <div>
            
                {loginInfo}
              
              {this.state.openPopup ? <PopUp toggle={this.togglePop}></PopUp>
                 : null}
            </div>
        </div>
      );
}

}
  export default NavBar;



 