import React from 'react';
import {Link} from 'react-router-dom';

const Button = props => {
return (
    <div>
        
        <button onClick={props.config.clickHandler}>{props.config.name}</button>
    </div>
)
   
};

export default Button;