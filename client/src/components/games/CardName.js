import React from 'react';
import { CardTitle, Button, Input } from 'reactstrap';
  import styled from 'styled-components';




export default class CardName extends Component {

    render() {
        if (props.level === "2" ) {
            console.log("level 2");
            //This level will want an input field and a button
            return (<>
            <Input  type="text" 
                    name="cardName" 
                    id="cardName" 
                    placeholder="Can you name this?"
            />
            <Button color="success" 
                    onClick={(e) => this.checkName(e, "1")}>Check</Button>{' '}
            </>)
            
        } else {
          console.log("level: " + level);
          return (<CardTitle>{ props.name || "Card Title" }</CardTitle>); 
        }
      }
}

export default CardName;