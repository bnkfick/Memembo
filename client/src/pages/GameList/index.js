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
    margin: 1.5rem;
    text-decoration: none;

    padding-top: 0.75rem;
    text-align: center;
    width: 17rem;

    &:hover{
        background-color: rgb(25, 9, 45);
        border: 1px solid white;
        transform: scale(1.025);
        cursor: pointer
    }

    & h3{
        margin: 0.75rem auto;
    }
`

const SearchWrapper = styled(Row)`
    justify-content: center;
    margin-bottom: 1.5rem;
`

const GameWrapper = styled(Row)`
    display: flex
    justify-content: space-evenly;
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
            <img src="https://i.pinimg.com/originals/79/4b/06/794b064076875b743c533b0c8b070fe3.jpg" alt="Card image cap" className="sc-jTzLTM cVlYDB card-img"/>
           <h3> {game.gameName} </h3>  
        </GameButton>
    </a>
    }

    render() {
        return (
            <>
                <SearchWrapper>
                    <Search
                        query={this.state.query}
                        onChange={this.onChange}

                    />
                </SearchWrapper>
                <GameWrapper>
                    
                    { this.state.games.map(game => {
                        return this.renderGame(game);
                    })}
                
                </GameWrapper>
            </>
        )
    }
}  


export default GameList;