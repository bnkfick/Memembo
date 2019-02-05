import React from 'react';

class MultipleChoice extends React.Component {

    state = {
        cardName: '',
        answered: this.props.clicked
    }

    componentDidMount() {
        this.props.handleClick(this.props.cardId);
    }

    render() {

        return (
            <h1>MULTIPLE CHOICE HERE</h1>
        );
    }
}

export default MultipleChoice;