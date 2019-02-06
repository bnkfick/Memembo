import React, { Component} from 'react';
import API from "../utils/API"
import { Row, Container, Col, Form, FormGroup, Label, Input, Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import CreateGameForm from '../components/games/CreateGameForm';
import CardDisplay from '../components/games/CardDisplay';
import styled from 'styled-components';
// import GlassContainer from '../theme/GlassContainer'

const StyledContainer = styled(Container)`
    margin: 2rem auto;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
    padding: 1rem 1rem 0 1rem;
    background-color: rgba(19, 18, 18, 0.671);
    backdrop-filter: blur(5px);   
    -webkit-backdrop-filter: blur(5px); 
`

const FormButton =  styled(Container)`
    background-color: rgba(95, 5, 250, 0.50);
    backdrop-filter: blur(5px);   
    -webkit-backdrop-filter: blur(5px); 
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
        background-color: rgba(95, 5, 250, 0.75);
        backdrop-filter: blur(5px);   
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid white;
        cursor: pointer;
    }
        
`
const StyledRow = styled(Row)`
    justify-content: space-evenly;
`
const StyledCard = styled(Card)`
    background-color: rgba(19, 18, 18, 0.45);
    backdrop-filter: blur(5px);   
    -webkit-backdrop-filter: blur(5px);
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
            gameCategories: [],

            cardArray: [],
            cardIdArray: [],
            src: "",
            cardName: "",
            details: [],
            category: "",
            userid: ""
        }
        this.getGameInfo = this.getGameInfo.bind(this)
        // this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {


        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    userid: user.data.user._id
                })
            }
            console.log(this.state.userid);
        }).catch(err => {
            console.log(err);
        });
    }
    
    
    
    getGameInfo(id, gameCategories){
        console.log("This is getGameId", id)
        this.setState({ game_id: id, gameCategories: gameCategories })

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
            let gameCategories = ([value][0].split(",").map(function(a){return a.trim()}));
            console.log(gameCategories);
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
                category: this.state.category,
                game_id: this.state.game_id
            })
            .then(res => {
                console.log("Card ID returned after save", res.data._id);
                this.setState({ cardIdArray: [...this.state.cardIdArray, res.data._id] });
                this.setState({ cardArray: [...this.state.cardArray, res.data] });
            })
            .then(() => {
            this.setState({src: "", cardName: "", details: [], category: "" })
            })
            .then((props)=> this.props.getGameInfo(this.state.game_id, this.state.gameCategories))
            .catch(err => console.log(err));
        }
    }
  
    render() {
    return (
        <>
            <StyledContainer>
                <CreateGameForm
                    getGameInfo = {this.getGameInfo}
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
                                        {this.state.gameCategories.length ? (
                                    <>
                                        {
                                            this.state.gameCategories.map(category => (
                                                <option key={category}>{category}</option>
                                            ))}
                                    </>
                                            ) : ("")}
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
                       {this.state.cardIdArray.length ? ( <>YOUR CARD SAVED!  ADD ANOTHER...</> ) : (<>ADD CARD</>)}
                    </FormButton>
                </Form>
            </StyledContainer>
            <StyledContainer>
                <StyledRow>
                {this.state.cardArray.length ? (
                    <>
                        {
                        this.state.cardArray.map(card => (
                            <CardDisplay
                                key={card._id}
                                cardName={card.cardName}
                                src={card.src}
                                details={card.details}
                                category={card.category}

                            />
                        ))}
                    </>
                        ) : ("")}
                </StyledRow>
            </StyledContainer>
    </>
    );
  }
}