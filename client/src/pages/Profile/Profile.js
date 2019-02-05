import React, {Component} from "react";
import { Container } from 'reactstrap';
import { Link } from "react-router-dom"
import API from "../../utils/API"
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    margin: 2rem auto;
    width: 75%;
    border: 1px solid white;
    border-radius: 5px;
    padding: 1rem 1rem 0 1rem;
`

const FormButton =  styled(Container)`
    background-color: rgb(48, 19, 84);
    border: 1px solid rgb(25, 9, 45);
    border-radius: 5px;
    font-size: 1.5rem;
    height: 4rem;
    letter-spacing: 0.3rem;
    margin-bottom: 1rem;

    padding-top: 0.75rem;
    text-align: center;
    width: calc(70% + 2rem);
    
    &:hover{
        background-color: rgb(25, 9, 45);
        border: 1px solid white;
        cursor: pointer
    }
        
`

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

        // console.log(this.props)
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
            <StyledContainer className="profilePage">
                {this.state.loggedIn ? (
                    <div className="profileBox">
                        <h1 id="userTitle">Welcome {this.state.user.username}</h1>
                        <ul>
                            { this.state.user.games.map(game => {
                                return (
                                    <li>
                                        <a key = {`${game}`} href={`/play/${game}`}>
                                        {game}
                                        </a>
                                    </li>
                                    );
                                 })}
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
                                <Link className="loginLink" to="/login"><FormButton className="loginBtn" color="info" >Login</FormButton></Link>
                            </>
                        ) : (
                            <p>Loading</p>
                        )}
                    </div> 
                )}
            </StyledContainer>
        )
    }
}


export default Profile;