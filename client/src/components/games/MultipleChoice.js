import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class MultipleChoice extends React.Component {

    state = {
        options: [],
        answered: this.props.clicked
    }

    componentWillMount() {
        this.setState({
            options: this.props.handleClick(this.props.cardId)
        });
    }

    render() {

        return (

            <>
                <FormGroup check>
                    {this.state.options.map(choice => {
                        return (
                            <>
                                <Label check>
                                    <Input type="radio" onClick={() => this.props.handleSelect()} name="radio1" />{' '}
                                    {choice}
                                </Label><br/>

                            </>
                        );
                    })}
                </FormGroup>
            </>

        )
    }
}

export default MultipleChoice;