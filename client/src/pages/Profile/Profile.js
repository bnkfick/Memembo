import React, {Component} from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"
import API from "../../utils/API"

class Profile extends Component {
    state = {
        loggedIn: false,
        user: null,
        loading: true
    }

    componentDidMount() {

        this.loading();

        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user
                });
            }
            console.log(this.state.user);
        }).catch(err => {
            console.log(err);
        });

        console.log(this.props)
    }

    loading() {
        setTimeout(()=> {
            this.setState({
                loading: false
            })
        }, 1000)  
    }

    render() {
        return (
            <div className="profilePage">
                {this.state.loggedIn ? (
                    <div className="profileBox">
                        <h1 id="userTitle">Welcome {this.state.user.username}</h1>
                        <ul>
                            <li>Games You've Made: {this.state.user.gameArray}</li>
                        </ul>
                        <ul>
                            <li>High Scores: {this.state.user.highscores}</li>
                        </ul>
                    </div>
                ) : (
                    <div className="noUser">
                        {!this.state.loading ? (
                            <>
                                <h1>please log in</h1>
                                <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block>Login</Button></Link>
                            </>
                        ) : (
                            <p>Loading</p>
                        )}
                    </div> 
                )}
            </div>
        )
    }
}


export default Profile;