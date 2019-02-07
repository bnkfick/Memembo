import React, {Component} from "react";
import { Container } from 'reactstrap';
import { Link } from "react-router-dom"
import API from "../../utils/API"
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    margin: 2rem auto;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
    padding: 1rem 1rem 0 1rem;
    background-color: rgba(19, 18, 18, 0.671);
    backdrop-filter: blur(5px);   
    -webkit-backdrop-filter: blur(5px); 

    h1 {
        text-align: center;
    }
`

const FormButton =  styled(Container)`
    background-color: rgba(95, 5, 250, 0.50);
    backdrop-filter: blur(5px);   
    -webkit-backdrop-filter: blur(5px); 
    border: 1px solid rgb(25, 9, 45);
    border-radius: 5px;
    font-size: 1.5rem;
    height: 4rem;
    letter-spacing: 0.3rem;
    margin-left: -1rem;
    padding-top: 0.75rem;
    text-align: center;
    width: calc(100% + 2rem);
    
    &:hover{
        background-color: rgba(95, 5, 250, 0.75);
        backdrop-filter: blur(5px);   
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid white;
        cursor: pointer;
    }
        
`
const GameButton = styled(Container)`
    background-color: rgb(48, 19, 84);
    border: 1px solid rgb(25, 9, 45);
    border-radius: 5px;
    font-size: 1.5rem;
    letter-spacing: 0.3rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    text-decoration: none;

    padding-top: 0.75rem;
    text-align: center;
    width: calc(40% + 2rem);

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
        loading: true,
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
            console.log(this.state.user.gameArray);
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
                                        <GameButton>
                                            <img src="https://i.pinimg.com/originals/79/4b/06/794b064076875b743c533b0c8b070fe3.jpg" alt="Card image cap" class="sc-jTzLTM cVlYDB card-img"/>
                                            {game.gameName}
                                        </GameButton>
                                    </a>
                                );
                                })}
                    
                        <h2>High Scores: {this.state.user.highscores}</h2>
                        <ul>
                            <li>Famous Artwork: 11</li>
                            <li>Mixology: 10</li>
                            <li>Colors and Numbers: 16</li>
                        </ul>
                    </div>
                ) : (
                    <div className="noUser">
                        {!this.state.loading ? (
                            <>
                                <h1>PLEASE LOG IN</h1>
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