import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import styled from 'styled-components';
import CardName from './CardName';
import MultipleChoice from './MultipleChoice';

const StyledCard = styled(Card)`
    background-color: rgb(25, 9, 45);
    border: 1px solid white;
    max-width: 17rem;
    margin-bottom:1em;

    h5 {
      text-align: center;
      border-bottom: 1px solid white;
    }
`
const StyledDiv = styled.div`
  width: 100%;
  height: 17rem;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
`
const StyledCardImg = styled(CardImg)`
  min-height: 100%;
  min-width: 100%;
  
`

const ExpertWrapper = styled.div`
  display: inline-flex;
`

const AnswerContainer = styled.div`
    position: relative;
    background-color: rgb(25, 9, 45);
    border: 1px solid white;
    max-width: 40rem;
    height:100%;
    text-align: left;
    padding: 2rem;
    margin-bottom:1em;
    border: ${ props => props.clicked === "true" ? "1px solid palevioletred" : "1px solid white"};
`

const displayDetails = (props) => {
  if (props.level === "1") {
    console.log("level 1");
  } else if (props.level === "2") {
    console.log("level 2");
    //return (<CardText>{props.details || "Card Details"}</CardText>)
  } else if (props.level === "3") {
    console.log("level 3");
  }
}

const CardItem = (props) => {
  // == EXPERT LEVEL ===//
  if (props.level === "3") {
    return (
      <ExpertWrapper>
        <StyledCard clicked={props.clicked ? props.clicked.toString() : "false"}>
          <StyledCardImg top width="100%"
            src={props.image || "https://i.pinimg.com/originals/79/4b/06/794b064076875b743c533b0c8b070fe3.jpg"}
            alt="Card image cap"
            onClick={() => props.handleClick(props.id, props.category)}
          />
          <CardBody>
            <CardName 
            name={props.name} 
            gameInProgress={props.gameInProgress} 
            clicked={props.clicked} 
            handleClick={props.handleClick3} 
            cardId={props.id} 
            level={props.level} />
          </CardBody>
        </StyledCard>
        <AnswerContainer>
          <MultipleChoice
            key={`multiple-choice-${props.id}`}
            name={props.name}
            gameInProgress={props.gameInProgress}
            clicked={props.clicked}
            makeChoices={props.makeChoices}
            handleSelect={props.handleSelect}
            cardId={props.id}
            level={props.level} />
        </AnswerContainer>
      </ExpertWrapper>
    );
  } else {
    // == BEGINNER AND ADVANCED LEVEL ===//
    return (
      <div>
        <StyledCard clicked={props.clicked ? props.clicked.toString() : "false"}>
          <StyledCardImg top width="100%"
            src={props.image || "https://i.pinimg.com/originals/79/4b/06/794b064076875b743c533b0c8b070fe3.jpg"}
            alt="Card image cap"
            onClick={() => props.handleClick(props.id, props.category)}
          />
          <CardBody>
            <CardName 
            name={props.name} 
            gameInProgress={props.gameInProgress} 
            clicked={props.clicked} 
            handleClick={props.nameCheck} 
            cardId={props.id} 
            level={props.level} />
          </CardBody>
        </StyledCard>
      </div>
    );
  }
};

export default CardItem;