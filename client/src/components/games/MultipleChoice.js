import React from 'react';


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
            { this.state.options.map(choice => {
                return (
                <>
                <input type='radio'/>
                 {choice}<br/>
                </>
                );
            })}
            </>

        )        
    }
}

export default MultipleChoice;