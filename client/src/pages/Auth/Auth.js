import React, { Component } from "react";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import API from "../../utils/API";


class Auth extends Component {

    state = {
        loggedIn: false,
        username: "",
        password: "",
        confirmPassword: "",
        user: null,
        message: ""
    }

    componentDidMount(){
        API.isLoggedIn().then(user => {
            if(user.data.loggedIn){
                this.setState({
                    loggedIn: true,
                    user: user.data,
                })
            }
        })
    };

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    };

    handleLogin = event => {
        event.preventDefault();
        if(this.state.username && this.state.password) {
            API.login({
                username: this.state.username,
                password: this.state.password
            }).then(user => {
                // console.log(user);
                if(user.data.loggedIn) {
                    this.setState({
                        loggedIn: true,
                        user: user.data.user
                    });
                    console.log("login successful");
                    console.log(this.state.user);
                    this.setState({
                        username: "",
                        password: ""
                    })
                    window.location.href = '/profile';
                }
                else if (user.data.message) {
                    this.setState({
                        message: user.data.message
                    })
                }
            });
        }
    };

    handleLogout = event => {
        event.preventDefault();
        console.log("logout hit");
            API.logout()
            .then(user => {
                // console.log(user);
                if(!user.data.loggedIn) {
                    console.log("logout successful");
                    this.setState({
                        loggedIn: false,
                        username: "",
                        password: "",
                        confirmPassword: "",
                        user: null,
                        message: "" 
                    })
                    console.log("This should take us to /");
                    window.location.pathname = '/';
                }
                else if (user.data.message) {
                    this.setState({
                        message: user.data.message
                    })
                }
            });
        
    };

    handleSignup = event => {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            API.signup({
                username: this.state.username,
                password: this.state.password
            }).then(user => {
                if(user.data.loggedIn) {
                    this.setState({
                        loggedIn: true,
                        user: user.data.user
                    });
                    console.log("login successful");
                    this.setState({
                        username: "",
                        password: ""
                    });
                    window.location.href = '/profile';
                } else {
                    console.log("Something went wrong:(");
                    console.log(user.data);
                    this.setState({
                        message: user.data,
                        username: "",
                        password: "",
                        confirmPassword: ""
                    });
                    
                }
            });
        }
    }

    render(){
        return(
            <div className="authBox">
                {(this.props.action === "login") ? (
                    <Login
                        username={this.state.username}
                        password={this.state.password}
                        handleLogin={this.handleLogin}
                        handleInputChange={this.handleInputChange}
                        message={this.state.message}
                        loggedIn={this.state.loggedIn}
                        handleLogout={this.handleLogout}
                    />
                ) : (
                    <Signup
                        username={this.state.username}
                        password={this.state.password}
                        confirmPassword={this.state.confirmPassword}
                        handleSignup={this.handleSignup}
                        handleInputChange={this.handleInputChange}
                        message={this.state.message}
                    />
                )}
            </div>
        )
    }
};

export default Auth;