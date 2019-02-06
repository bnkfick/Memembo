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

            <Form>
                <FormGroup check>
                    {this.state.options.map((choice, index) => {
                        return (
                            <>
                                <Label check>
                                    <Input type="radio"  
                                    onClick={() => this.props.handleSelect(this.props.cardId, {choice})} 
                                    key={`radio-${index}-${this.props.cardId}`} name="{`radio-${index}`}" />{' '}
                                    {choice}
                                </Label><br/>

                            </>
                        );
                    })}
                </FormGroup>
            </Form>

        )
    }
}

export default MultipleChoice;