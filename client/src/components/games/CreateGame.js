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
                <Label for="gameGroup" sm={2}>Game Group:</Label>
                <Col sm={4}>
                    <Input  type="select" 
                            name="gameGroup" 
                            id="gameGroup" 
                            required
                    >
                        <option>Coding</option>
                        <option>Food & Drink</option>
                        <option>Geography</option>
                        <option>Language</option>
                        <option>Law</option>
                        <option>Math</option>
                        <option>Politics</option>
                        <option>Science</option>
                        <option>Create New Group</option>

                    </Input>
                </Col>
                <Col sm={4}>
                    <Input  type="text" 
                            name="gameGroup" 
                            id="gameGroup"
                            placeHolder="New Group" 
                    />
                </Col>
                <Col sm={2}>
                    <Button>+</Button>
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="audience" sm={2}>Target Audience: (Select Multiple if Needed)</Label>
                <Col sm={4}>
                    <Input type="select" name="audience" id="audience" multiple required>
                        <option>All Ages</option>
                        <option>Pre-K</option>
                        <option>Middle School | Jr. High</option>
                        <option>Highschool</option>
                        <option>College</option>
                        <option>Adult</option>
                    </Input>
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label for="gameName" sm={2}>Game Name:</Label>
                <Col sm={10}>
                    <Input  type="text" 
                            name="gameName" 
                            id="gameName" 
                            placeholder="Create a Name for Your Game."
                            required
                    />
                </Col>
            </FormGroup>
            
            

            <FormGroup row>
                <Label for="gameCategories" sm={2}>Game Categories:</Label>
                <Col sm={10}>
                    <Input  type="text" 
                            name="gameCategories" 
                            id="gameCategories" 
                            placeholder="Create categories for your game, separated by commas. (Required)"
                            required
                    />
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label for="gameCategoryType" sm={2}>Game Category Type:</Label>
                <Col sm={10}>
                    <Input  type="text" 
                            name="gameCategoryType" 
                            id="gameCategoryType" 
                            placeholder="Create a category type for your game categories. (If Needed) eg: "
                            required
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="cardDetailsType" sm={2}>Card Detail Type:</Label>
                <Col sm={10}>
                    <Input  type="text" 
                            name="cardDetailsType" 
                            id="cardDetailsType" 
                            placeholder="Create a card detail type. (Required)"
                            required
                    />
                </Col>
            </FormGroup>

            

            <FormGroup row>
                <Label for="gameCategoryType" sm={2}>Easy Game Instructions:</Label>
                <Col sm={10}>
                    <h4>
                    Click on Cards that are [gameCategories] [gameCategoryType]</h4>
                </Col>
                <Col sm={{ size: 10, offset: 2 }}>
                Dynamicaly render the instructions here for each [gameCategories] & [cardDetailsType] created.
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="advancedInstructions" sm={2}>Advanced Game Instructions:</Label>
                <Col sm={10}>
                    <h4>
                        Enter the NAME of each [gameCategories] [gameCategoryType]
                    </h4>
                </Col>
                <Col sm={{ size: 10, offset: 2 }}>
                Dynamicaly render the instructions here for each [gameCategories] & [cardDetailsType] created.
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="expertInstructions" sm={2}>Expert Game Instructions:</Label>
                <Col sm={10}>
                    <h4>
                        Select the correct [cardDetailsType] for each [gameCategories]
                    </h4>
                </Col>
                <Col sm={{ size: 10, offset: 2 }}>
                Dynamicaly render the instructions here for each [cardDetailsType],[gameCategories] & [cardDetailsType] created.
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col sm={{ size: 10, offset: 2 }}>
                    <StyledButton>Save & Continue</StyledButton>
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label for="createCard" sm={2}>Create Cards:</Label>
                <Col sm={6}>
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
                <Col sm={{ size: 10, offset: 2 }}>
                    <StyledButton>Submit Game</StyledButton>
                </Col>
            </FormGroup>
        </Form>
    </StyledContainer>
    );
  }
}