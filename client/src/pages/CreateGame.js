import React, { Component} from 'react';
import API from "../utils/API"
import { Row, Container, Col, Button, Form, FormGroup, Label, Input, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
import CreateGameForm from '../components/games/CreateGameForm';
import CardForm from '../components/games/CardForm';
import CardItem from '../components/games/CardItem';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    margin: 2rem auto;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
    padding: 1rem 1rem 0 1rem;
`
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
        cursor: pointer
    }
        
`

const StyledRow = styled(Row)`
    justify-content: space-evenly;
`
const StyledCard = styled(Card)`
    background-color: rgb(25, 9, 45);
    border: 1px solid white;
    width: 80%;
    margin: auto;
`
const StyledCardImg = styled(CardImg)`
    max-height: 23rem;
`
const StyledH5 = styled.h5`
    margin: 1.5rem auto;
    text-align: center;
`
export default class CreateGame extends Component {
    
    constructor() {
        super()
        this.state = {
            game_id: "",
            
            cards: [],
            src: "",
            cardName: "",
            details: [],
            category: ""
        }
        this.getGameId = this.getGameId.bind(this)
        // this.handleClick = this.handleClick.bind(this)
    }
    
    
    
    getGameId(id){
        console.log("This is getGameId", id)
        this.setState({ game_id: id })

    };
    // componentDidMount() {
    //     this.loadGames();
    //     this.loadCards();
    // };

    // loadGames = () => {
    //     API.getGames()
    //         .then(res =>
    //             this.setState({ games: res.data, gameGroup: "", audience: [], gameName: "", gameCategories: [], gameCategoryType: "", cardDetailsType: "" })
    //         )
    //         .catch(err => console.log(err))
    // };
    
    // loadCards = () => {
    //     API.getCards()
    //         .then(res =>
    //             this.setState({ cards: res.data, src: "", cardName: "", details: [], category: "" })
    //         )
    //         .catch(err => console.log(err))
    // };

    // handleClick(event) {
    //     event.preventDefault()
    //     console.log('sanity check');
    // }

    deleteCard = id => {
        API.deleteCard(id)
            .then(res => this.loadCards())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        // console.log([name]);
        // console.log([value]);
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
        <>
            
            <StyledContainer>
                <CreateGameForm
                    getGameId = {this.getGameId}
                />
            </StyledContainer>
        
            <StyledContainer>
                <Form>
                    <Row>
                        <Col sm={6}>
                            <FormGroup row>
                                <Label for="src" sm={4}>Card Image:</Label>
                                <Col sm={8}>
                                    <Input
                                        type="text" 
                                        name="src" 
                                        id="src" 
                                        placeholder="Image URL"
                                        value={this.state.src}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                            </FormGroup>
                
                            <FormGroup row>
                                <Label for="cardName" sm={4}>Card Name:</Label>
                                <Col sm={8}>
                                    <Input
                                        type="text" 
                                        name="cardName" 
                                        id="cardName" 
                                        placeholder="Card Name"
                                        value={this.state.cardName}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                            </FormGroup>
                        
                            <FormGroup row>
                                <Label for="details" sm={4}>Card Details:</Label>
                                <Col sm={8}>
                                    <Input
                                        type="textarea" 
                                        name="details" 
                                        id="details" 
                                        placeholder="Card Details"
                                        value={this.state.details}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="gameGroup" sm={4}>Card Category:</Label>
                                <Col sm={8}>
                                    <Input
                                        type="select" 
                                        name="category" 
                                        id="category" 
                                        placeholder="category"
                                        value={this.state.category}
                                        onChange={this.handleSelectChange}
                                    >
                                        <option>Pick One</option>
                                        <option>[gameCategories-1]</option>
                                        <option>[gameCategories-2]</option>
                                        <option>[gameCategories-3]</option>
                                        <option>[gameCategories-4]</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <StyledCard >
                                <StyledCardImg
                                    src={ this.state.src || "https://i.pinimg.com/originals/79/4b/06/794b064076875b743c533b0c8b070fe3.jpg"}
                                    alt="Card image cap" 
                                />
                                <CardBody>
                                    <CardTitle>
                                        { this.state.cardName || "Card Name..."}
                                    </CardTitle>
                                    <CardText>
                                        { this.state.details || "Card Details..."}
                                    </CardText>
                                </CardBody>
                            </StyledCard>
                            <StyledH5>Card Category (Hidden): {this.state.category}</StyledH5>
                        </Col>
                    </Row>
                    
                    <FormButton
                        disabled={!(this.state.cardName && this.state.details && this.state.category)}
                        onClick={this.handleCardSubmit}
                    >
                       ADD CARD
                    </FormButton>
                </Form>
            </StyledContainer>
            <StyledContainer>
                <StyledRow>
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                    <CardItem />
                </StyledRow>
                <Form>    
                    <FormButton>
                       SUBMIT GAME & CARDS
                    </FormButton>
                </Form>
            </StyledContainer>
    </>
    );
  }
}