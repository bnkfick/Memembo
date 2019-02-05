import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
  import styled from 'styled-components';

const StyledCard = styled(Card)`
    background-color: rgb(25, 9, 45);
    border: 1px solid white;
    max-width: 20rem;
    margin-bottom:1em;
`
const StyledDiv = styled.div`
  width: 20rem;
  height: 20rem;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
`
const StyledCardImg = styled(CardImg)`
  min-height: 100%;
  min-width: 100%;
  /* IE 8 */
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  /* IE 5-7 */
  filter: alpha(opacity=0);
  /* modern browsers */
  opacity: 0;
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
        <CardTitle>{props.cardName || "Card Title"}</CardTitle>
        <CardText>
          {props.details}
        </CardText>
        <CardText>
          {props.category} (Will be Hidden)
        </CardText>
      </CardBody>
    </StyledCard>
  );
};

export default CardDisplay;