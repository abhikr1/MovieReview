import React from 'react';
import './HomePage.css';
import './LoginPage.css';
class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            errormessage:''
        };
    }
        componentDidMount() {
            
        }
          onInput = event => {
            this.setState({ [event.target.name]: event.target.value });
        }
        logInClick = (e) => {
            e.preventDefault();
            console.log("Hello inside Submit Click");
            fetch(`/api/sessions/`,{
                method : 'POST',
                body : JSON.stringify({email : this.state.email, password : this.state.password}),
                headers : {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then((response) =>
                // if(response.ok){
                //     window.location.reload();
                //     return;
                // }
              response.json())
              
            .then((json) => {
                if(json.error)
                this.setState({errormessage : json.error})
                else
                window.location.reload();
                console.log(json)})
        }
        

        // componentDidMount() {
        //     fetch(`/api/movies?page=0`)
        //       .then((response) => response.json())
        //       .then((response) => {
        //         //console.log(response.movies);
        //         this.setState({ totalPages: response.totalPages });
        //         this.setState({ movies: response.movies });
        //       });
        //   }



        signUpClick = (e) => {
            e.preventDefault();
            console.log("Hello inside Submit Click");
            fetch(`/api/users/`, {
                method : 'POST',
                body : JSON.stringify({email : this.state.email, password : this.state.password}),
                headers : {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            // }).then(response => response.json())
            // .then(response => 
            //     console.log(response);
            // })
            }).then((response) =>
            // if(response.ok){
            //     window.location.reload();
            //     return;
            // }
          response.json())
          
        .then((json) => {
            if(json.error)
            this.setState({errormessage : json.error})
            else
            
            this.setState({errormessage : "Successfully signed up! Please LogIn"})
    })
}
            render() {

              return (
                <div class="formContainer1">
                <form>
                    <div class = "loginheading1">Login/SignUp</div>
                    
                    <div className="entries1">
                    <input
                        className="email1"
                        type="email"
                        required="required"
                        placeholder="Enter E-mail"
                        name="email"
                        onInput={this.onInput} 
                        value={this.state.email}
                    />
                    </div>
                    <div className="entries1">
                    <input
                        className="password1"
                        type="password"
                        required="required"
                        placeholder="Enter password.."
                        name="password"
                        onInput={this.onInput} 
                        value={this.state.password}
                    />
                    </div>
                    </form>
                    <div className = "entries1">
                    <input type ="submit" className="submitBtn" onClick={this.logInClick}
                        value = "Login"
                    />
                    </div>
                    
                    <div className = "entries1">
                    <input type ="submit" className="submitBtn" onClick={this.signUpClick}
                        value = "SignUp"
                    />
                    </div>
                    {this.state.errormessage ? <div className = "errorMessage">{this.state.errormessage}</div> : null}
                </div>
                )    
        };
    }
          export default LoginPage;