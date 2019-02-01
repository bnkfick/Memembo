import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
  import styled from 'styled-components';

const StyledCard = styled(Card)`
    background-color: rgb(25, 9, 45);
    border: 1px solid white;
    max-width: 15rem;

`

const CardItem = (props) => {
  return (
    <div>
      <StyledCard>
        <CardImg top width="100%" src={props.image || "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"} alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.name || "Card Title"}</CardTitle>
          {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
          <CardText>{props.details || "Card Details"}</CardText>
          {/* <Button>Button</Button> */}
        </CardBody>
      </StyledCard>
    </div>
  );
};

export default CardItem;

