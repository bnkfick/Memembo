import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import API from "../../utils/API"
import Search from "../../components/header/Search";

// Exporting both GameList and GameListItem from this file

// GameList renders a bootstrap list item
class GameList extends Component {

    state = {
        games: [],
        search: ""
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

    onChange = e => {
        this.setState({
            search: e.target.value
        });
        // console.log(this.state.search);
    }

    renderGame = game => {

        const search = this.state.search;
        console.log(game);
        if(search !== "" && game.gameGroup.toLowerCase().indexOf( search.toLowerCase() ) === -1){
            return null;
        }

        return <li>
                    {/* <p>GAME: {game._id}</p> */}
                    <a href={`/play/${game._id}`}>
                    {game.gameName}
                    </a>
               </li>
    }


    render() {
        return (
            <>
                <Search
                    search = {this.state.search}
                    onChange = {this.onChange}
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