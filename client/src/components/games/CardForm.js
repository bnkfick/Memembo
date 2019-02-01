import React from 'react';
import { Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import styled from 'styled-components';

const StyledCard = styled(Card)`
        background-color: rgb(25, 9, 45);
        border: 1px solid white;

`


const CardForm = (props) => {
  return (
    <div>
      <StyledCard>
        <CardBody>
            <FormGroup row>
                <Input  type="text" 
                        name="itemImage" 
                        id="itemImage" 
                        placeholder="Image URL"
                />
            </FormGroup>
            
            <FormGroup row>
                <Input  type="text" 
                        name="itemName" 
                        id="itemName" 
                        placeholder="Item Name"
                />
            </FormGroup>
            
            <FormGroup row>
                <Input  type="text" 
                        name="itemDetail" 
                        id="itemDetail" 
                        placeholder="Item Detail"
                />
            </FormGroup>
            
            <Row>
                <Col sm={6}>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            True
                        </Label>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            False
                        </Label>
                    </FormGroup>
                </Col>
            </Row>
          {/* <Button>Button</Button> */}
        </CardBody>
      </StyledCard>
    </div>
  );
};

export default CardForm;