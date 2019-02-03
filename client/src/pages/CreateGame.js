import React, { Component } from 'react';
import API from "../utils/API"
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import CardForm from '../components/games/CardForm';
import CardItem from '../components/games/CardItem';
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
    state = {
        games: [],
        cards: [],
        gameGroup: "",
        audience: [],
        gameName: "",
        gameCategories: [],
        gameCategoryType: "",
        cardDetailsType: "",

        src: "",
        cardName: "",
        details: [],
        category: ""
    }
    
    componentDidMount() {
        this.loadGames();
        this.loadCards();
    };

    loadGames = () => {
        API.getGames()
            .then(res =>
                this.setState({ games: res.data, gameGroup: "", audience: [], gameName: "", gameCategories: [], gameCategoryType: "", cardDetailsType: "" })
            )
            .catch(err => console.log(err))
    };
    
    loadCards = () => {
        API.getCards()
            .then(res =>
                this.setState({ cards: res.data, src: "", cardName: "", details: [], category: "" })
            )
            .catch(err => console.log(err))
    };

    deleteCard = id => {
        API.deleteCard(id)
            .then(res => this.loadCards())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        console.log([name]);
        console.log([value]);
        if([name][0] === 'gameCategories') {
            let gameCategories = ([value][0].split(",")).map(function(a){return a.trim()});
            this.setState({gameCategories: gameCategories});
        } else {
            this.setState({ [name]: value });
        }
    };


    // https://stackoverflow.com/questions/28624763/retrieving-value-from-select-with-multiple-option-in-react
    handleSelectChange = event => {
        const { name } = event.target
        const options = event.target.options;
        const value = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }

        this.setState({ [name]: value})
    }

    handleGameSubmit = event => {
        event.preventDefault();

        if (this.state.gameGroup && this.state.audience && this.state.gameName && this.state.gameCategories && this.state.cardDetailsType) {
            API.saveGame({
                gameGroup: this.state.gameGroup,
                audience: this.state.audience,
                gameName: this.state.gameName,
                gameCategories: this.state.gameCategories,
                gameCategoryType: this.state.gameCategoryType,
                cardDetailsType: this.state.cardDetailsType,
            })
                .then(res => this.loadGames())
                .catch(err => console.log(err));
        }
    };

    handleCardSubmit = event => {
        event.preventDefault();
        if (this.state.src && this.state.cardName && this.state.details && this.state.category) {
            API.saveCard({
                src: this.state.src,
                cardName: this.state.cardName,
                details: this.state.details,
                category: this.state.category
            })
        }
    }
  
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
                            value={this.state.gameGroup}
                            onChange={this.handleSelectChange}
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
                {/* <Col sm={4}>
                    <Input  type="text" 
                            name="gameGroup" 
                            id="gameGroup"
                            placeHolder="New Group" 
                    />
                </Col>
                <Col sm={2}>
                    <Button>+</Button>
                </Col> */}
            </FormGroup>

            <FormGroup row>
                <Label for="audience" sm={2}>Target Audience: (Select Multiple if Needed)</Label>
                <Col sm={4}>
                        <Input type="select"
                                name="audience"
                                id="audience"
                                multiple required
                                value={this.state.audience}
                                onChange={this.handleSelectChange}
                        >
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
                            value={this.state.gameName}
                            onChange={this.handleInputChange}
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
                            value={this.state.gameCategories}
                            onChange={this.handleInputChange}
                    />
                </Col>
            </FormGroup>
            
            <FormGroup row>
                <Label for="gameCategoryType" sm={2}>Game Category Type:</Label>
                <Col sm={10}>
                    <Input  type="text" 
                            name="gameCategoryType" 
                            id="gameCategoryType" 
                            placeholder="Create a category type for your game categories. (If Needed)"
                            value={this.state.gameCategoryType}
                            onChange={this.handleInputChange}
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
                            value={this.state.cardDetailsType}
                            onChange={this.handleInputChange}
                    />
                </Col>
            </FormGroup>

            

            <FormGroup row>
                <Label for="gameCategoryType" sm={2}>Easy Game Instructions:</Label>
                <Col sm={10}>
                    <h4>
                            Click on Cards that are a [gameCategories] [gameCategoryType].</h4>
                </Col>
                <Col sm={{ size: 10, offset: 2 }}>
                        Click on Cards that are a {this.state.gameCategories} {this.state.gameCategoryType}.
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
                Enter the NAME of each {this.state.gameCategories} {this.state.gameCategoryType}.
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
                Select the correct {this.state.cardDetailsType} for each {this.state.gameCategories}
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col sm={{ size: 10, offset: 2 }}>
                        <StyledButton
                            disabled={!(this.state.gameGroup && this.state.audience && this.state.gameName && this.state.gameCategories && this.state.cardDetailsType)}
                            onClick={this.handleGameSubmit}
                        >Save & Continue
                        </StyledButton>
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