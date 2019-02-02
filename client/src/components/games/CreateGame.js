import React, { Component } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import CardForm from './CardForm'
import CardItem from './CardItem'
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    margin-top: 5rem;
    width: 100%;
`
const StyledButton = styled(Button)`
    background-color: rgb(48, 19, 84);
    border: 1px solid rgb(25, 9, 45);
    font-size: 1.5rem;
    width: 50%;
    /* margin-left: 0 !important;
    padding-left: 0 !important; */

    &:hover{
        background-color: rgb(25, 9, 45);
        border: 1px solid white;
        /* transform: scale(1.12); */
    }
`


export default class CreateGame extends Component {
  render() {
    return (
      <StyledContainer>
        <Form>
            <FormGroup row>
                <Label for="gameCategory" sm={2}>Game Category:</Label>
                <Col sm={10}>
                    <Input  type="select" 
                            name="gameCategory" 
                            id="gameCategory" />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="exampleSelectMulti" sm={2}>Target Audience:</Label>
                <Col sm={10}>
                    <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple />
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label for="gameName" sm={2}>Game Name:</Label>
                <Col sm={10}>
                    <Input  type="text" 
                            name="gameName" 
                            id="gameName" 
                            placeholder="Enter fun name for your game."
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                    <Label for="easyInstructions" sm={2}>Easy Game Instructions:</Label>
                    <h3>Click on Cards that are `VODKA`</h3>
                    <Col sm={4}>
                    {/* <FormText color="muted">
                    This is some placeholder block-level help text for the above input.
                    It's a bit lighter and easily wraps to a new line.
                    </FormText> */}
                    <Input  type="text" 
                            name="easyInstructions" 
                            id="easyInstructions" 
                            placeholder="Click on cards that are...(must be true or false)" />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="advancedInstructions" sm={2}>Advanced Game Instructions:</Label>
                <Col sm={10}>
                    {/* <FormText color="muted">
                    This is some placeholder block-level help text for the above input.
                    It's a bit lighter and easily wraps to a new line.
                    </FormText> */}
                    <Input  type="text" 
                            name="advancedInstructions" 
                            id="advancedInstructions" 
                            placeholder="Enter the name of item pictured on card" />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="expertInstructions" sm={2}>Expert Game Instructions:</Label>
                <Col sm={10}>
                    {/* <FormText color="muted">
                    This is some placeholder block-level help text for the above input.
                    It's a bit lighter and easily wraps to a new line.
                    </FormText> */}
                    <Input  type="text" 
                            name="expertInstructions" 
                            id="expertInstructions" 
                            placeholder="Enter the details of item pictured on card" />
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label for="createCard" sm={2}>Create Cards:</Label>
                <Col sm={3}>
                    <CardForm />
                </Col>
                <Col sm={3}>
                    <Button>Add Item</Button>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col sm={3}>
                    <CardItem />
                </Col>
                <Col sm={3}>
                    <CardItem />
                </Col>
                <Col sm={3}>
                    <CardItem />
                </Col>
                <Col sm={3}>
                    <CardItem />
                </Col>
                
            </FormGroup>
            <FormGroup row>
                <Col sm={3}>
                    <CardItem />
                </Col>
                <Col sm={3}>
                    <CardItem />
                </Col>
                <Col sm={3}>
                    <CardItem />
                </Col>
                <Col sm={3}>
                    <CardItem />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col sm={3}>
                    <CardItem />
                </Col>
                <Col sm={3}>
                    <CardItem />
                </Col>
                <Col sm={3}>
                    <CardItem />
                </Col>
                <Col sm={3}>
                    <CardItem />
                </Col>
            </FormGroup>
            
        
            
            <FormGroup row>
                <Col sm={{ size: 10, offset: 2 }}>
                    <StyledButton>Submit Game</StyledButton>
                </Col>
            </FormGroup>
        </Form>
    </StyledContainer>
    );
  }
}