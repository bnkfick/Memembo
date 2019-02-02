import React from "react";
import CardItem from "../components/games/CardItem";
import MsgBar from "../components/layout/MsgBar";
import API from "../utils/API";
import gameObj from "./games.json";
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';


const StyledContainer = styled(Container)`
    margin-top: 5rem;
    width: 100%;
`
const easyInstructions = "Click on cards that are ";
const advancedInstructions = "Enter the Name of each ";
const expertInstructions = "Select the correct ingredients for each ";

class PlayGame extends React.Component {

    state = {
        game: {},
        score: 0,
        highScore: 0,
        msg: ""
    };


    tileCardClick = clickedId => {

        this.shuffle(this.state.game.tiles);

        const updatedTiles = [...gameObj.tiles];
        let tileIdx = gameObj.tiles.findIndex(tile => tile.id === clickedId);

        if (this.state.game.tiles[tileIdx].clicked === true) {
            this.setState({
                msg: "You've clicked that Tile already. Try Again."
            });
            this.resetGame();
        } else {
            let newScore = this.state.score;
            newScore++;
            if (newScore === 12) {
                this.setState({
                    msg: "WINNER! That's the best possible score!",
                    highScore: this.checkHighScore(newScore),
                });
                this.resetGame();
            } else {
                updatedTiles[tileIdx].clicked = true;
                this.setState({
                    msg: "+1 You haven't clicked that Tile before!",
                    score: newScore,
                    highScore: this.checkHighScore(newScore),
                    tiles: updatedTiles
                })
            }

        }
    };

    checkHighScore = (currentScore) => {
        //-- Already incremented if correct answer, but not setState yet --//
        let newHiScore = Math.max(currentScore, this.state.highScore);

        if (currentScore < this.state.highScore) {
            return this.state.highScore;
        } else if (this.state.hightScore === 12) {
            return 12;
        } else {
            return newHiScore;
        }
    }

    componentDidMount() {
        this.getGame("5c55fb75ded50b007c0da713");
    }


    getGame = (id) => {
        console.log("getGame");
        console.log(id);


        API.getGame(id).then(res => {
            this.setState({
                game: res.data
            })
            console.log(this.state.game);
            console.log(this.state.game.cardArray);
            
        })
            .catch(err => console.log(err));

    }

    resetGame = () => {
        const game = game;
        const updatedTiles = game.cardArray;

        updatedTiles.map(card => {
            card.clicked = false;
        });

        this.setState({
            tiles: updatedTiles,
            score: 0
        });
        return true;
    };

    checkState = () => {
        console.log("checkState");
        console.log(this.state.game.cardArray);


    }

    //================================================/
    // Mix up the images inside the array 
    // Fisher-Yates (aka Knuth) Shuffle
    // http://sedition.com/perl/javascript-fy.html
    //===============================================/
    shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render() {


        if ( this.isEmpty(this.state.game) ) {
            return (<h1>...loading</h1>)
        }
        console.log("NOT EMPTY");
        console.log(this.state.game);
        console.log("card array NOT EMPTY");
        console.log(this.state.game.cardArray);
        console.log(this.state.game.cardArray.length);
        return (
            <>
                <MsgBar score={this.state.score} highScore={this.state.highScore} msg={this.state.msg}></MsgBar>
                <StyledContainer>
                    <Row>
                    {   
                        this.state.game.cardArray.map((tile, index) => {
                        return (
                            <Col sm={3} key={`col-${index}`}>
                                <CardItem
                                    key={tile.id}
                                    name={tile.name}
                                    details={tile.details}
                                    image={tile.src}
                                    category={tile.category}
                                    clicked={tile.clicked}
                                    handleClick={this.tileCardClick}
                                />
                            </Col>)
                        })
                    } 
                    </Row>
                </StyledContainer>

            </>
        );
    }
    

}

export default PlayGame;
