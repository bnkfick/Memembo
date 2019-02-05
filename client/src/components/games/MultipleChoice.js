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
        console.log("=============options");
        console.log(this.state.options);
            return (
            this.state.options.map(choice => {
                return (<>{choice}<br /></>);                           
            })
            )
        
    }
}

export default MultipleChoice;