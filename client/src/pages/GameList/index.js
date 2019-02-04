import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import API from "../../utils/API"

// Exporting both GameList and GameListItem from this file

// GameList renders a bootstrap list item
class GameList extends Component {

    state = {
        games: []
    }

    componentDidMount() {
        API.getGames().then(res => {
            console.log(res.data);
            this.setState({
                games: res.data
            })
        })
        .catch(err => console.log(err));
    }


    render() {
        return (
            <ul>
            { this.state.games.map(game => {
                return (
                <li>
                        <p>GAME: {game._id}</p>
                        <a href={`/play/${game._id}`}>
                        {game.gameName}
                        </a>
                </li>
                );
            })}
            </ul>
        )
    }  
}

export default GameList;