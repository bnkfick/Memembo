import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class MultipleChoice extends React.Component {

    state = {
        options: [],
        answered: this.props.clicked
    }

    componentWillMount() {
        this.setState({
            options: this.props.makeChoices(this.props.cardId)
        });
    }
      
    render() {
        return (
            <>
            <Form>
                <FormGroup check>
                    {this.state.options.map((choice, index) => {
                        return (
                            <>
                                <Label check>
                                    <Input type="radio"  
                                    onClick={() => this.props.handleSelect(this.props.cardId, {choice})} 
                                    key={`radio-${index}-${this.props.cardId}`} name="{`radio-${index}`}" />{' '}
                                    {choice.join(', ')}
                                </Label><br/><br/>

                            </>
                        );
                    })}
                </FormGroup>
            </Form>

            {console.log(this.props.gameOver)}
            {this.props.name}<br/>
            {this.props.gameOver ? this.props.details:''}
            </>
        )
        
    }
}

export default MultipleChoice;