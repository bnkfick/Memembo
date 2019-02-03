import React from "react";
import CardItem from "../components/games/CardItem";
import MsgBar from "../components/layout/MsgBar";
import API from "../utils/API";
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
        level: "1",
        score: 0,
        highScore: 0,
        msg: ""
    };


    tileCardClick = (clickedId, category) => {
        console.log(clickedId);
        console.log(category);

        const updatedTiles = [...this.state.game.cardArray];
        console.log(updatedTiles);
        let tileIdx = updatedTiles.findIndex(tile => tile._id === clickedId);
        console.log(tileIdx);
        if (this.state.game.cardArray[tileIdx].clicked === true) {
            console.log("You've clicked this already");
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
            let array = this.shuffle(res.data.cardArray);
            let dbgame = res.data;
            dbgame.cardArray = array;
            this.setState({
                game: dbgame
            })
        })
        .catch(err => console.log(err));
    }

    resetGame = () => {
        // == Make a deep copy of an object
        let newGame = JSON.parse(JSON.stringify(this.state.game));
        console.log(newGame);
        newGame.cardArray.map(card => {
            card.clicked = false;
        });

        this.setState({
            game: newGame,
            score: 0
        });
        return true;
    };

    setLevel = (event, level) => {
        event.preventDefault();
        console.log("++++++++++++++++++++++++++++++");
        console.log(level);
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
                    <StyledButton key="level-1" level={this.BEGINNER} onClick={(e) => this.setLevel(e, "1")}>BEGINNER</StyledButton>
                    <StyledButton key="level-2" level={this.ADVANCED} onClick={(e) => this.setLevel(e, "2")}>ADVANCED</StyledButton>
                    <StyledButton key="level-3" level={this.EXPERT}   onClick={(e) => this.setLevel(e, "3")}>EXPERT</StyledButton>
                </StyledContainer>
                <StyledContainer>

                    Click on the cards that are
                    {
                        this.state.game.gameCategories.map(category => {
                            return (<> {category} </>)
                        }

                        )}
                    {this.state.game.gameCategoryType}
                    <MsgBar score={this.state.score} highScore={this.state.highScore} msg={this.state.msg}></MsgBar>
                </StyledContainer>
                <StyledContainer>
                    <Row>
                        {
                            this.state.game.cardArray.map((card, index) => {
                                return (
                                    <Col sm={3} key={`col-${index}`}>
                                        <CardItem
                                            id={card._id}
                                            key={card._id}
                                            name={card.cardName}
                                            level={this.state.level}
                                            details={card.details}
                                            image={card.src}
                                            category={card.category}
                                            clicked={card.clicked}
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
