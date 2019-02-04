import React from "react";
import CardItem from "../components/games/CardItem";
import MsgBar from "../components/layout/MsgBar";
import API from "../utils/API";
import { Container, Row, Col, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import styled from 'styled-components';


const StyledContainer = styled(Container)`
    margin-top: 2rem;
    width: 100%;
    text-align: center;
`
const StyledButton = styled(Button)`
    font-size: 1.5rem;
    margin: .5rem;
    width: 20%;
    /* margin-left: 0 !important;
    padding-left: 0 !important; */

    &:hover{
        border: 1px solid white;
        /* transform: scale(1.12); */
    }

    .active {
        cursor: not-allowed;
    }
`
const easyInstructions = "Click on cards that are ";
const advancedInstructions = "Enter the Name of each ";
const expertInstructions = "Select the correct ingredients for each ";

class PlayGame extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.select = this.select.bind(this);

        this.state = {
            dropdownOpen: false,
            value: "this kind of",
            game: {},
            level: "1", // defaults to beginner level
            selectedCategory: '',
            score: 0,
            highScore: 0,
            msg: "",
            msgcolor: "info"
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    select(event) {
        console.log(event.target);
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            value: event.target.innerText,
            selectedCategory: event.target.innerText
        });
    }

    nameCheck = (level, cardName) => {
        console.log("nameCheck");
        console.log(cardName);
    }

    cardClick = (clickedId, category) => {
        console.log(clickedId);
        console.log(category);

        // == If no catergory has been selected, prompt the user ==/
        if (this.state.selectedCategory === '') {
            this.setState({
                msg: "Select a Category to Play",
                msgcolor: "warning"
            })
            return;
        }
        // == Copy cardArray to flip clicked flag ==/
        const updatedTiles = [...this.state.game.cardArray];
        console.log(updatedTiles);
        // == Get the index of the clicked card
        let tileIdx = updatedTiles.findIndex(tile => tile._id === clickedId);
        console.log(tileIdx);
        // check if this tile has been clicked before
        // == If the tile has already been clicked, prompt the user
        if (this.state.game.cardArray[tileIdx].clicked === true) {
            console.log("You've clicked this already");
            this.setState({
                msg: "You've clicked that Tile already. Try Again.",
                msgcolor: "warning"
            });
            return;
        }

        //disable click if click===true
        //check if this tile is the correct category
        if (category !== this.state.selectedCategory) {
            console.log("Wrong Answer");
            this.setState({
                msg: "Wrong Answer. Try Again.",
                msgcolor: "danger"
            });
            this.resetGame();
        } else {
            let newScore = this.state.score;
            newScore++;
            if (newScore === updatedTiles.length) {
                this.setState({
                    msg: "WINNER! That's the best possible score!",
                    msgcolor: "success",
                    highScore: this.checkHighScore(newScore),
                });
                this.resetGame();
            } else {
                updatedTiles[tileIdx].clicked = true;
                this.setState({
                    msg: "+1 Good Answer!",
                    msgcolor: "success",
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
        } else if (this.state.highScore === this.state.game.cardArray.length) {
            return this.state.game.cardArray.length;
        } else {
            return newHiScore;
        }
    }

    componentDidMount() {
        let id = undefined;
        if (this.props.match.params) {
            id = this.props.match.params.id;
        }

        this.getGame(id);
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

    shuffleClick = () => {
            // == Make a deep copy of an object
        let gameCopy = JSON.parse(JSON.stringify(this.state.game));
        console.log(gameCopy);
        gameCopy.cardArray = this.shuffle(gameCopy.cardArray);
        this.setState({
            game: gameCopy,
        });
        return true;
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

                {/* === THE GAME LEVEL BUTTONS FOR BEGINNER ADVANCED AND EXPERT ===*/}
                <StyledContainer>
                    <StyledButton color="success" className={
                        this.state.level === "1"
                            ? "active"
                            : ''} key="level-1" level={this.BEGINNER} onClick={(e) => this.setLevel(e, "1")}>BEGINNER</StyledButton>{' '}
                    <StyledButton color="warning" className={
                        this.state.level === "2"
                            ? "active"
                            : ''} key="level-2" level={this.ADVANCED} onClick={(e) => this.setLevel(e, "2")}>ADVANCED</StyledButton>{' '}
                    <StyledButton color="danger" className={
                        this.state.level === "3"
                            ? "active"
                            : ''} key="level-3" level={this.EXPERT} onClick={(e) => this.setLevel(e, "3")}>EXPERT</StyledButton>
                </StyledContainer>
                {/* === END THE GAME LEVEL BUTTONS FOR BEGINNER ADVANCED AND EXPERT ===*/}

                {/* ===================  DISPLAY THE INSTRUCTIONS  =================== */}
                {/* ============ EMBEDDED MSGBAR WITH SCORE AND THE TOP SCORE ======== */}
                <StyledContainer>
                    Click on the cards that are{' '}
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret color="primary">
                            {this.state.value}
                        </DropdownToggle>
                        <DropdownMenu>
                            {
                                this.state.game.gameCategories.map(category => {
                                    return (<DropdownItem onClick={this.select}>{category}</DropdownItem>)
                                })
                            }
                        </DropdownMenu>
                    </ButtonDropdown>{' '}
                    {this.state.game.gameCategoryType}
                    {/* =================== DISPLAY THE SCORE AND THE TOP SCORE =================== */}
                    <MsgBar score={this.state.score} highScore={this.state.highScore} msg={this.state.msg} msgcolor={this.state.msgcolor}></MsgBar>
                </StyledContainer>


                {/* =================== DISPLAY THE GAME CARDS =================== */}
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
                                            handleClick={this.cardClick}
                                            handleClick2={this.nameCheck}
                                        />
                                    </Col>)
                            })
                        }
                    </Row>
                </StyledContainer>         
                {/* =================== END DISPLAY THE GAME CARDS =================== */}

            </>
        );
    }
}

export default PlayGame;
