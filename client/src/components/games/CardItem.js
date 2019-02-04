import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
  import styled from 'styled-components';

const StyledCard = styled(Card)`
    background-color: rgb(25, 9, 45);
    border: 1px solid white;
    max-width: 15rem;
    margin-bottom:1em;
    border: ${ props => props.clicked === "true" ? "1px solid palevioletred" : "1px solid white"};
`

const displayDetails = (props) => {
  if (props.level === "1" ) {
    console.log("level 1");
  } else if (props.level === "2" ) {
      console.log("level 2");
      //return (<CardText>{props.details || "Card Details"}</CardText>)
  } else if (props.level === "3" ) {
    console.log("level 3");
  }
}

const CardItem = (props) => {
  return (
    <div>
      {/* clicked= { props.clicked.toString() } */}
      <StyledCard >
        <CardImg top width="100%" 
        src={ props.image || "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"} 
        alt="Card image cap" 
        onClick={() => props.handleClick(props.id, props.category)}
        />
        <CardBody>
          <CardTitle>{props.name || "Card Title"}</CardTitle>
          {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
          {displayDetails(props)} 

          {/* <Button>Button</Button> */}
        </CardBody>
      {/* </StyledCard> */}
    </div>
  );
};

export default CardItem;