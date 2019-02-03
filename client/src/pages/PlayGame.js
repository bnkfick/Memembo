import React from "react";
import CardItem from "../components/games/CardItem";
import MsgBar from "../components/layout/MsgBar";
import API from "../utils/API";
import gameObj from "./games.json";
import { Container, Row, Col, Button } from 'reactstrap';
import styled from 'styled-components';


const StyledContainer = styled(Container)`
    margin-top: 5rem;
    width: 100%;
    text-align: center;
`
const StyledButton = styled(Button)`
    background-color: rgb(48, 19, 84);
    border: 1px solid rgb(25, 9, 45);
    font-size: 1.5rem;
    margin: 1rem;
    width: 20%;
    /* margin-left: 0 !important;
    padding-left: 0 !important; */

    &:hover{
        background-color: rgb(25, 9, 45);
        border: 1px solid white;
        /* transform: scale(1.12); */
    }
`
const easyInstructions = "Click on cards that are ";
const advancedInstructions = "Enter the Name of each ";
const expertInstructions = "Select the correct ingredients for each ";

class PlayGame extends React.Component {

    state = {
        game: {},
        level: "",
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
        this.getGame("5c562b8f0d4fa54a2159d72b");
    }


    getGame = (id) => {
        console.log(id);

        API.getGame(id).then(res => {
            this.setState({
                game: res.data
            })
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

    setLevel = (event, level) => {
        event.preventDefault();
        if (level === null || level === "") {
            this.setState({
                level: "1"
            });
        } else {
            this.setState({
                level
            })
        }


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
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render() {


        if (this.isEmpty(this.state.game)) {
            return (<h1>...loading</h1>)
        }

        return (
            <>
                <StyledContainer>
                    <StyledButton level={this.BEGINNER} onClick={(e) => this.setLevel(e, "1")}>BEGINNER</StyledButton>
                    <StyledButton level={this.ADVANCED} onClick={(e) => this.setLevel(e, "2")}>ADVANCED</StyledButton>
                    <StyledButton level={this.EXPERT} onClick={(e) => this.setLevel(e, "3")}>EXPERT</StyledButton>
                </StyledContainer>
                <StyledContainer>
                <MsgBar score={this.state.score} highScore={this.state.highScore} msg={this.state.msg}></MsgBar>
                </StyledContainer>
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
