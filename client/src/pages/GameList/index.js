import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import API from "../../utils/API";
import Search from "../../components/header/Search";

// Exporting both GameList and GameListItem from this file

// GameList renders a bootstrap list item
class GameList extends Component {

    state = {
        games: [],
        query: ""
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

        return <li>
            <a href={`/play/${game._id}`}>
            {game.gameName}
            </a>

        </li>
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