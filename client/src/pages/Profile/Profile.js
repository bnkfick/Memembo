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
const GameButton = styled(Container)`
    background-color: rgb(48, 19, 84);
    border: 1px solid rgb(25, 9, 45);
    border-radius: 5px;
    font-size: 1.5rem;
    height: 20rem;
    letter-spacing: 0.3rem;
    margin-bottom: 1rem;
    text-decoration: none;

    padding-top: 0.75rem;
    text-align: center;
    width: calc(20% + 2rem);

    -webkit-box-shadow: 2px 2px 2px rgba(0,0,0,0.5), 
                        2px 2px 2px inset rgba(255,255,255,0.5), 
                        -2px -2px 2px inset rgba(0,0,0,0.2);
    -moz-box-shadow: 2px 2px 2px rgba(0,0,0,0.5), 
                     2px 2px 2px inset rgba(255,255,255,0.5), 
                    -2px -2px 2px inset rgba(0,0,0,0.2);
    box-shadow: 2px 2px 2px rgba(0,0,0,0.5), 
                2px 2px 2px inset rgba(255,255,255,0.5), 
                -2px -2px 2px inset rgba(0,0,0,0.2);
  

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
                }, () =>{
                    API.getUserGames(this.state.user._id).then(
                        res => this.setState({
                            user: res.data
                        })
                    ).catch(err => console.log(err))
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
                        
                        
                        { this.state.user.gameArray.map(game => {
                            return (
                                    <a key = {game._id} href={`/play/${game._id}`}>
                                    <GameButton>{game.gameName}</GameButton>
                                    </a>
                                );
                                })}
                    
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