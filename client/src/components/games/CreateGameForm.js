import React, { Component } from 'react';
import API from "../../utils/API"
import { Row, Container, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    background-color: rgb(48, 19, 84);
    border: 1px solid rgb(25, 9, 45);
    font-size: 1.5rem;
    width: 100%;
    /* margin-left: 0 !important;
    padding-left: 0 !important; */

    &:hover{
        background-color: rgb(25, 9, 45);
        border: 1px solid white;
        /* transform: scale(1.12); */
    }
`
const FormButton =  styled(Container)`
    background-color: rgb(48, 19, 84);
    border: 1px solid rgb(25, 9, 45);
    border-radius: 5px;
    font-size: 1.5rem;
    height: 4rem;
    letter-spacing: 0.3rem;
    margin-left: -1rem;
    padding-top: 0.75rem;
    text-align: center;
    width: calc(100% + 2rem);
    
    &:hover{
        background-color: rgb(25, 9, 45);
        border: 1px solid white;
        cursor: pointer;
    }

    &:disabled{
        background-color: rgb(25, 9, 45);
    }
        
`

const InstructionFormGroup = styled(Col)`
    background-color: rgb(25, 9, 45);
    border-radius: 10px;
    padding: 1.5rem;
    margin-bottom: 1rem;

    h4 {
        border-bottom: 1px solid white;
    }
`
export default class CreateGameForm extends Component {
    
    state = {
        games: [],
        cards: [],
        gameGroup: "",
        audience: [],
        gameName: "",
        gameCategories: [],
        gameCategoryType: "",
        cardDetailsType: "",
    }

    // loadGame = () => {
    //     API.getGame(id)
    //         .then(res =>
    //             this.setState({ games: res.data, gameGroup: res.data.gameGroup, audience: res.data.audience, gameName: res.data.gameName, gameCategories: res.data.gameCategories, gameCategoryType: res.data.gameCategoryType, cardDetailsType: res.data.cardDetailsType})
    //         )
    //         .then(res => console.log(res.data) )
    //         .catch(err => console.log(err))
    // };

    handleInputChange = event => {
        const { name, value } = event.target;
        // console.log([name]);
        // console.log([value]);
        if ([name][0] === 'gameCategories') {
            let gameCategories = ([value][0].split(", "));
            console.log(gameCategories);
            this.setState({ gameCategories: gameCategories });
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

        this.setState({ [name]: value })
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
                .then(res => this.loadGame())
                .catch(err => console.log(err));
        }
    };
    render() {
        return (

            <Form>
                <Row>
                    <Col sm={6}>
                        <FormGroup row>
                            <Label for="gameGroup" sm={4}>Game Group:</Label>
                            <Col sm={8}>
                                <Input type="select"
                                    name="gameGroup"
                                    id="gameGroup"
                                    required
                                    value={this.state.gameGroup}
                                    onChange={this.handleSelectChange}
                                >
                                    <option>Pick a Group</option>
                                    <option>Art</option>
                                    <option>Coding</option>
                                    <option>Food & Drink</option>
                                    <option>Geography</option>
                                    <option>History</option>
                                    <option>Language</option>
                                    <option>Law</option>
                                    <option>Math</option>
                                    <option>Music</option>
                                    <option>Parenting</option>
                                    <option>Politics</option>
                                    <option>Pop-Culture</option>
                                    <option>Science-Biology</option>
                                    <option>Science-Chemistry</option>
                                    <option>Science-Geology</option>
                                    <option>Science-Medical</option>
                                    <option>Science-Zoology</option>
                                    <option>Create New Group</option>

                                </Input>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="audience" sm={4}>Target Audience: (Select Multiple if Needed)</Label>
                            <Col sm={8}>
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
                            <Label for="gameName" sm={4}>Game Name:</Label>
                            <Col sm={8}>
                                <Input type="text"
                                    name="gameName"
                                    id="gameName"
                                    placeholder="(Required)"
                                    required
                                    value={this.state.gameName}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="gameCategories" sm={4}>Game Categories:</Label>
                            <Col sm={8}>
                                <Input type="text"
                                    name="gameCategories"
                                    id="gameCategories"
                                    placeholder="Comma Separated (Required)"
                                    required
                                    value={this.state.gameCategories}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </FormGroup>
            
                        <FormGroup row>
                            <Label for="gameCategoryType" sm={4}>Game Category Type:</Label>
                            <Col sm={8}>
                                <Input type="text"
                                    name="gameCategoryType"
                                    id="gameCategoryType"
                                    placeholder="(If Needed)"
                                    value={this.state.gameCategoryType}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="cardDetailsType" sm={4}>Card Detail Type:</Label>
                            <Col sm={8}>
                                <Input type="text"
                                    name="cardDetailsType"
                                    id="cardDetailsType"
                                    placeholder="(Required)"
                                    required
                                    value={this.state.cardDetailsType}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </FormGroup>
                        
                    </Col>
                    <Col sm={6}>
                        <InstructionFormGroup row>
                            <Col sm={12}><h4>Easy Game Instructions:</h4></Col>
                            <Col sm={12}>
                                {this.state.gameCategories.length ? (
                                    <>
                                        {
                                            this.state.gameCategories.map(category => (
                                                <p key={category}>GAME-{(this.state.gameCategories.indexOf(category) + 1)}: Click on Cards that are a {category} {this.state.gameCategoryType}</p>
                                            ))}
                                    </>
                                ) : (<p>TEMPLATE: Click on Cards that are a [gameCategory] [gameCategoryType].</p>)}
                            </Col>
                        </InstructionFormGroup>

                        <InstructionFormGroup row>
                            <Col sm={12}><h4>Advanced Game Instructions:</h4></Col>
                            <Col sm={12}>
                                {this.state.gameCategories.length ? (
                                    <>
                                        {
                                            this.state.gameCategories.map(category => (
                                                <p key={category}>GAME-{(this.state.gameCategories.indexOf(category) + 1)}: Enter the name of each {category} {this.state.gameCategoryType}</p>
                                            ))}
                                    </>
                                ) : (<p>TEMPLATE: Enter the name of each [Game Category] [Game Category Type].</p>)}
                            </Col>
                        </InstructionFormGroup>

                        <InstructionFormGroup row>
                            <Col sm={12}><h4>Expert Game Instructions:</h4></Col>
                            <Col sm={12}>
                                {this.state.gameCategories.length ? (
                                    <>
                                        {
                                            this.state.gameCategories.map(category => (
                                    
                                                <p key={category}>GAME-{(this.state.gameCategories.indexOf(category) + 1)}: Select the correct {this.state.cardDetailsType} for each {category} {this.state.gameCategoryType}</p>
                                        
                                            ))}
                                    </>
                                ) : (<p>TEMPLATE: Select the correct [Card Details Type] for each [Game Category] [Game Category Type].</p>)}
                            </Col>
                        </InstructionFormGroup>
                    </Col>
                </Row>
                
                <FormButton
                    disabled={!(this.state.gameGroup && this.state.audience && this.state.gameName && this.state.gameCategories && this.state.cardDetailsType)}
                    onClick={this.handleGameSubmit}
                >
                SAVE GAME SHELL & CONTINUE
                </FormButton>
            </Form>
            


        )
    }
}


