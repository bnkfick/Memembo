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
    max-width: 15rem;
    height:100%;
    margin-bottom:1em;
    border: ${ props => props.clicked === "true" ? "1px solid palevioletred" : "1px solid white"};
`
const StyledCardImg = styled(CardImg)`

`

const ExpertWrapper = styled.div`
  display: inline-flex;
`

const AnswerContainer = styled.div`
    background-color: rgb(25, 9, 45);
    border: 1px solid white;
    max-width: 15rem;
    height:100%;
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

            {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
            <CardName name={props.name} gameInProgress={props.gameInProgress} clicked={props.clicked} handleClick={props.handleClick3} cardId={props.id} level={props.level} />
            {/* <Button>Button</Button> */}
          </CardBody>
        </StyledCard>
        <AnswerContainer>
        <MultipleChoice  name={props.name} gameInProgress={props.gameInProgress} clicked={props.clicked} 
        handleClick={props.handleClick3} 
        handleSelect={props.handleSelect} cardId={props.id} level={props.level} >Multiple Choice goes here</MultipleChoice>
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

            {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
            <CardName name={props.name} gameInProgress={props.gameInProgress} clicked={props.clicked} handleClick={props.handleClick2} cardId={props.id} level={props.level} />
            {/* <Button>Button</Button> */}
          </CardBody>
        </StyledCard>
      </div>
    );
  }
};

export default CardItem;