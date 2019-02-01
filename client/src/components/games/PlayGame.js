import React from "react";
import CardItem from "./CardItem";
import MsgBar from "../layout/MsgBar";
import gameObj from "./games.json";
import { Container } from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    margin-top: 5rem;
    width: 100%;
`

class PlayGame extends React.Component {

  state = {
    game: [],
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
          highScore:  this.checkHighScore(newScore),
          tiles: updatedTiles
        })
      }

    }
  };


  // easyInstructions: "Click on cards that are ["Vodka Drink", "Whiskey Drink", "Gin Drink"],
  // advancedInstructions: "Enter the Name of each ["Vodka Drink", "Whiskey Drink", "Gin Drink"]",
  // expertInstructions: "Select the correct ingredients for each ["Vodka Drink", "Whiskey Drink", "Gin Drink"]",

  checkHighScore = (currentScore) => {
    //-- Already incremented if correct answer, but not setState yet --//
    let newHiScore = Math.max(currentScore, this.state.highScore);

    if ( currentScore < this.state.highScore ) {
      return this.state.highScore;
    } else if (this.state.hightScore === 12)  {
      return 12;
    } else {
      return newHiScore;
    }
  }

  componentDidMount() {
    console.log("========================================componentDidMount");
    const game = this.getGame();
    console.log(game);
    let tiles = game.tiles;
    console.log(tiles);
    game.tiles = this.shuffle(tiles);
    
    console.log(tiles);
    this.setState({
      game: game
    });
  }


  getGame = () => {
    console.log("getGame()");
    const game = gameObj;
    console.log(game);
    return game;

    //   API.getGame().then(res =>  { 
    //     console.log(res);
    //     this.setState({
    //     game: res.data
    //   })}) 
    //   .catch(err => console.log(err));

  }

  resetGame = () => {
    const game = game;
    const updatedTiles = game.tiles;

    updatedTiles.map(tile => {
      tile.clicked=false;
    });

    this.setState({
      tiles: updatedTiles,
      score: 0
    });
    return true;
  };


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



  render() {
    return (
      <>
        <MsgBar score={this.state.score} highScore={this.state.highScore} msg={this.state.msg}></MsgBar>
        <header id="showcase">
          <div className="bg-image"></div>
          <div className="content-wrap">
            <h1>Welcome to the Clicky Game</h1>
            <p>TEST YOUR MEMORY.</p>
            <p>Don't click the same image more than once &mdash; or your score will reset.</p>

          </div>
        </header>
        <StyledContainer>
          {
            this.state.game.tiles.map(tile => {
              return (

                <CardItem
                  key={tile.id}
                  id={tile.id}
                  image={tile.image}
                  category={tile.category}
                  clicked={tile.clicked}
                  handleClick={this.tileCardClick}
                />)
            })
          }
        </StyledContainer>

      </>
    );
  }

}

export default PlayGame;
