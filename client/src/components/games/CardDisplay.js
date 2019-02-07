import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
  import styled from 'styled-components';

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

const CardDisplay = (props) => {
  return (
    <StyledCard >
      <StyledDiv style={{backgroundImage: `url(${props.src || "https://i.pinimg.com/originals/79/4b/06/794b064076875b743c533b0c8b070fe3.jpg"})`}}>
        <StyledCardImg 
          src={ props.src || "https://i.pinimg.com/originals/79/4b/06/794b064076875b743c533b0c8b070fe3.jpg"} 
          alt="Card image cap" 
        />
      </StyledDiv>
      <CardBody>
        <h5>{props.cardName || "Card Title"}</h5>
        <p>
          {props.details || "Card Details"}
        </p>
        <p>
          {props.category || "Card Category (Will be Hidden)" }
        </p>
      </CardBody>
    </StyledCard>
  );
};

export default CardDisplay;