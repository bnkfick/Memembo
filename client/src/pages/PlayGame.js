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
            gameInProgress: false,
            msg: "",
            msgcolor: "info",
            user: '',
            loggedIn: false,
            expertUserAnswers: []
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

    componentDidMount() {
        let id = undefined;
        if (this.props.match.params) {
            id = this.props.match.params.id; //game._id
        }

        API.getGame(id)
            .then(res => {
                let array = this.shuffle(res.data.cardArray);
                let dbgame = res.data;
                dbgame.cardArray = array;
                API.isLoggedIn()
                    .then(user => {
                        this.setState({
                            loggedIn: user.data.loggedIn,
                            user: user.data.user,
                            game: dbgame
                        })
                    }).catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => console.log(err));
    }

    //== LEVEL TWO (ADVANCED) Game Checker
    nameCheck = (level, cardId, cardName) => {

        // Check to see that it is not an empty string
        // Check to see if the answer is correct
        // In order to check and see if the answer is correct
        // You need to copy the cardArray
        // == Copy cardArray to flip clicked flag ==/
        let newGame = JSON.parse(JSON.stringify(this.state.game));

        // == Get the index of the clicked card
        let tileIdx = newGame.cardArray.findIndex(tile => tile._id === cardId);
        newGame.cardArray[tileIdx].clicked = true;

        let gameOver = this.allAnswered(newGame.cardArray);
        // == Check to see if the userInput answer matches the stored/correct answer
        if (cardName.toLowerCase() !== newGame.cardArray[tileIdx].cardName.toLowerCase()) {
            if (gameOver) {
                this.setState({
                    msg: "Wrong Answer. GAME OVER.  Play Again.",
                    msgcolor: "danger",
                    game: newGame,
                    gameInProgress: true
                });
                this.resetGame(this.state.level);
            } else {
                this.setState({
                    msg: "Wrong Answer. Try Again.",
                    msgcolor: "danger",
                    game: newGame,
                    gameInProgress: true
                });
            }
        } else {
            let newScore = this.state.score;
            newScore++;

            //DRY THIS UP ALSO IN cardClick
            if (gameOver) {
                this.setState({
                    msg: "+1 Good Answer!",
                    msgcolor: "success",
                    score: newScore,
                    highScore: this.checkHighScore(newScore),
                    game: newGame,
                    gameInProgress: true
                })
                this.resetGame(this.state.level);
            } else {
                this.setState({
                    msg: "+1 Good Answer!",
                    msgcolor: "success",
                    score: newScore,
                    highScore: this.checkHighScore(newScore),
                    game: newGame,
                    gameInProgress: true
                })
            }
        }
    }

    allAnswered = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].clicked === false) { return false; }
        }
        return true;
    }
    //== LEVEL ONE (BEGINNER) Game Checker
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

        // == Get the index of the clicked card
        let tileIdx = updatedTiles.findIndex(tile => tile._id === clickedId);

        // check if this tile has been clicked before
        // == If the tile has already been clicked, prompt the user
        if (this.state.game.cardArray[tileIdx].clicked === true) {

            this.setState({
                msg: "You've clicked that Tile already. Try Again.",
                msgcolor: "warning"
            });
            return;
        }


        //== Check if this tile is the correct category
        if (category !== this.state.selectedCategory) {
            console.log("Wrong Answer");
            this.setState({
                msg: "Wrong Answer. Try Again.",
                msgcolor: "danger"
            });
            this.resetGame(this.state.level);
        } else {
            let newScore = this.state.score;
            newScore++;

            if (newScore === updatedTiles.length) {
                this.setState({
                    msg: "WINNER! That's the best possible score!",
                    msgcolor: "success",
                    highScore: this.checkHighScore(newScore),
                });
                this.resetGame(this.state.level);
            } else {
                //DRY THIS UP ALSO IN nameCheck
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

    checkQuiz = () => {

        let newScore = this.state.score;

        if (this.state.expertUserAnswers.length == this.state.game.cardArray.length) {
            console.log("You've answered all the questions");
            //check answers
            for (let i = 0; i < this.state.game.cardArray.length; i++) {
                let cardId = this.state.game.cardArray[i]._id;
                                         
                let tileIdx = this.state.expertUserAnswers.findIndex(tile => tile._id === cardId);

                if (this.state.game.cardArray[i].details.join('') ===
                    this.state.expertUserAnswers[tileIdx].details.join('') ) {
                    console.log("CORRECT ANSSER");
                    newScore++;
                    
                } else {
                    console.log("WRONG ANSWER");
                }
            }
            this.setState({
                score: newScore,
                msg: "YOU GOT " + newScore + "/" + this.state.game.cardArray.length + " CORRECT"
            });


         } else {
            this.setState({
                msg: `You've only answered ${this.state.expertUserAnswers.length} questions out of ${this.state.game.cardArray.length}`
            });
        }

    }

    checkHighScore = (currentScore) => {
        //-- Already incremented if correct answer, but not setState yet --//
        let newHiScore = Math.max(currentScore, this.state.highScore);

        if (currentScore < this.state.highScore) {
            return this.state.highScore;
        } else if (this.state.highScore === this.state.game.cardArray.length) {
            return this.state.game.cardArray.length;
        } else {
            // console.log(this.state.user);
            // if (this.state.user != undefined && this.state.user != '') {
            //     API.setHighScore(this.state.user._id, {game: this.state.game._id, highScore: newHiScore});
            // }
            return newHiScore;
        }
    }

    resetGame = (level) => {
        // == Make a deep copy of an object
        let newGame = JSON.parse(JSON.stringify(this.state.game));

        newGame.cardArray.map(card => {
            card.clicked = false;
        });
        let selectedLevel = level;
        if (level) selectedLevel = level
        else selectedLevel = this.state.level;

        let newGameInProgress = false;

        this.setState({
            game: newGame,
            gameInProgress: newGameInProgress,
            score: 0,
            level: selectedLevel,
        });
        return true;
    };

    setLevel = (event, level) => {
        event.preventDefault();
        this.resetGame(level);
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

    // == THIS IS CALLED WHEN A RADIO BUTTON IS SELECTED ON THE EXPERT PAGE
    handleSelect = (cardId, userAnswer) => {
    //NOT SURE WHY userAnswer details is userAnswer.choice
        let newAnswers = [...this.state.expertUserAnswers];
        let tileIdx = newAnswers.findIndex(tile => tile._id === cardId);

        //check to see if this answer is already in the array
        if (tileIdx > -1) {
            newAnswers[tileIdx] = { _id: cardId, details: userAnswer.choice };
        } else {
            newAnswers.push({ _id: cardId, details: userAnswer.choice });
        }
        //set the user selection on an array
        this.setState({
            expertUserAnswers: newAnswers
        })
    }

    //  == THIS SELECTS A RANDOM ANSWER FROM ALL POSSIBLE ANSWERS ==//
    //  == FOR THE EXPERT MULTIPLE CHOICE OPTIONS ==//
    createAnswerOption = (options, card) => {

        var option = this.state.game.cardArray[Math.floor(Math.random() * this.state.game.cardArray.length)];
        //Stop a wrong answer from repeating within the answer choices array
        //if the selected choice is the same as the answer try again
        //or if the selected choice is already in the list of answer choices, try again
        if (option.details.join('') === card.details.join('') || options.indexOf(option) !== -1) {
            return this.createAnswerOption(options, card);
        }

        return option.details;
    }

    //  == FOR THE EXPERT MULTIPLE CHOICE OPTIONS ==//
    //  == MAKE AN ARRAY OF MULTIPLE ANSWERS BASED ON POSSIBLE ANSWERS
    makeChoices = (cardId) => {

        //get the card with the id
        let tileIdx = this.state.game.cardArray.findIndex(tile => tile._id === cardId);
        let card = this.state.game.cardArray[tileIdx];

        // ====================================================

        let options = []; //an array of 3 possible answers

        let option1 = this.createAnswerOption(options, card);
        options.push(option1);

        var option2 = this.createAnswerOption(options, card);
        options.push(option2);

        //Add the actual answer to a random spot in the array
        options.splice(Math.floor((Math.random() * options.length + 1)), 0, card.details);

        return options;


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
                                this.state.game.gameCategories.map((category, index) => {
                                    return (<DropdownItem key={`${this.state.game._id}-${category}`} onClick={this.select}>{category}</DropdownItem>)
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
                                    <Col sm={this.state.level === "3" ? "12" : "3"} key={`col-${index}`}>
                                        <CardItem
                                            id={card._id}
                                            key={card._id}
                                            name={card.cardName}
                                            level={this.state.level}
                                            details={card.details}
                                            image={card.src}
                                            category={card.category}
                                            clicked={card.clicked}
                                            gameInProgress={this.state.gameInProgress}
                                            handleClick={this.cardClick}      //BEGINNER
                                            nameCheck={this.nameCheck}        //ADVANCED
                                            makeChoices={this.makeChoices}    //EXPERT
                                            handleSelect={this.handleSelect}  //EXPERT
                                        />
                                    </Col>)
                            })
                        }
                    </Row>
                </StyledContainer>
                {/* =================== END DISPLAY THE GAME CARDS =================== */}
                {this.state.level === "3" ?
                    (<StyledButton
                        onClick={() => this.checkQuiz()}
                        color="primary">Submit</StyledButton>)
                    : ""
                }
                <StyledButton
                        onClick={() => this.resetGame(this.state.level)}
                        color="danger">Reset Game</StyledButton>
            </>
        );
    }
}

export default PlayGame;
