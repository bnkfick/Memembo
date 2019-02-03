import React, { Component } from 'react';
import API from "../utils/API"
import { Row, Container, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import CreateGameForm from '../components/games/CreateGameForm';
import CardForm from '../components/games/CardForm';
import CardItem from '../components/games/CardItem';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    margin: 2rem auto;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
    padding: 1rem;
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



export default class CreateGame extends Component {
    state = {
        games: [],
        cards: [],

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
                <CreateGameForm />
            </StyledContainer>
        
        <StyledContainer>
           
            
            
            
            
            <Form>

            

            

            
            
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
    </>
    );
  }
}