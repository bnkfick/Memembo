import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import API from "../../utils/API";
import Search from "../../components/header/Search";
import styled from 'styled-components';

const GameButton = styled(Container)`
    background-color: rgb(48, 19, 84);
    border: 1px solid rgb(25, 9, 45);
    border-radius: 5px;
    font-size: 1.5rem;
    letter-spacing: 0.3rem;
    margin-bottom: 1rem;
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

// Exporting both GameList and GameListItem from this file

// GameList renders a bootstrap list item
class GameList extends Component {

    state = {
        games: [],
        query: ""
    }

    componentDidMount() {
        API.getGames().then(res => {
            // console.log(res.data);
            this.setState({
               games: res.data
            })
        }).catch(err => console.log(err));
    }

    onChange = event => {

        this.setState({
            query: event.target.value
        })
    }
    renderGame=game => {
        const query= this.state.query;
        console.log(game)
        if(query !== "" && game.gameGroup.toLowerCase().indexOf(query.toLowerCase())=== -1){
            return null;
        }

        return<a key = {game._id} href={`/play/${game._id}`}>
        <GameButton>
            <img src="https://i.pinimg.com/originals/79/4b/06/794b064076875b743c533b0c8b070fe3.jpg" alt="Card image cap" class="sc-jTzLTM cVlYDB card-img"/>
            {game.gameName}
        </GameButton>
    </a>
    }

    render() {
        return (

            <>
            <Search
                query={this.state.query}
                onChange={this.onChange}

            />
            <ul>
            { this.state.games.map(game => {
                return this.renderGame(game);
            })}
            </ul>
            </>
        )
    }
}  


export default GameList;