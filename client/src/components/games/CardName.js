import React from 'react';
import { CardTitle, Button, Input } from 'reactstrap';
import styled from 'styled-components';




class CardName extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardName: ''
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
    if (this.props.level === "2") {
      console.log("level 2");
      //This level will want an input field and a button
      return (<>
        <Input type="text"
          name="cardName"
          id="cardName"
          value={this.state.cardName}
          onChange={this.handleInputChange}
          placeholder="Name?"
        /><Button 
          onClick={() => this.props.handleClick(this.props.level, this.state.cardName)}
                        color="success">&#x2713;</Button>{' '}
      </>)

    } else {
      return (<CardTitle>{this.props.name || "Card Title"}</CardTitle>);
    }
  }
}

export default CardName;