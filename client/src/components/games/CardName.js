import React from 'react';
import { CardTitle, Button, Input } from 'reactstrap';
import styled from 'styled-components';


const StyledInput = styled(Input)`
  display: inline-block;
  width: 70%;
  margin-right: 1em;
  vertical-align: middle;
`

class CardName extends React.Component {

  state = {
    cardName: '',
    answered: this.props.clicked
  }

  componentWillReceiveProps(props) {
    const { gameInProgress } = this.props.gameInProgress;
    if (props.gameInProgress !== gameInProgress && props.gameInProgress === false) {
      this.setState({cardName: ""})
    }
  }

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    console.log(`this.props.gameInProgress: ${this.props.gameInProgress}`);
    if (this.props.level === "2") {

      if (this.props.clicked === false) {
        //This level will want an input field and a button if not answered
        return (<>
          <StyledInput type="text"
            name="cardName"
            id="cardName"
            value={this.state.cardName}
            onChange={this.handleInputChange}
            placeholder="Name?"
          /><Button
            onClick={() => this.props.handleClick(this.props.level, this.props.cardId, this.state.cardName)}
            color="success">&#x2713;</Button>{' '}
        </>)
      } else {
        return (<>
          Your Answer: {this.state.cardName}<br />
          Correct Answer: {this.props.name}
        </>);
      }
    } else {
      return (<CardTitle>{this.props.name || "Card Title"}</CardTitle>);
    }
  }
}

export default CardName;