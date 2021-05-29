import React from 'react';
import './HomePage.css';
import './LoginPage.css';
class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
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
            }).then(response => window.location.reload());
        }



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
            }).then(response => console.log(response.json()));
        }
            render() {

              return (
                <div class="formContainer">
                <form>
                    <h2>Login</h2>
                    <hr></hr>
                    <div className="entries">
                    <input
                        className="email"
                        type="email"
                        required="required"
                        placeholder="abhikr1@gmail.com"
                        name="email"
                        onInput={this.onInput} 
                        value={this.state.email}
                    />
                    </div>
                    <div className="entries">
                    <input
                        className="password"
                        type="password"
                        required="required"
                        placeholder="Enter password.."
                        name="password"
                        onInput={this.onInput} 
                        value={this.state.password}
                    />
                    </div>
                    </form>
                    <div className = "entries">
                    <input type ="submit" className="submitBtn" onClick={this.logInClick}
                        value = "Login"
                    />
                    </div>
                    
                    <div className = "entries">
                    <input type ="submit" className="submitBtn" onClick={this.signUpClick}
                        value = "SignUp"
                    />
                    </div>
                </div>
                )    
        };
    }
          export default LoginPage;