import React from 'react';
import {withRouter} from 'react-router-dom';
import Button from './Button';

const ButtonManager = props => {
    console.log(props);
    const buttonConfig = [{name:'Food & Drink', path:'/something', icon:null, clickHandler:()=>(props.history.push('/something'))},{name:'Language', path:'/something', icon:null},{name:'Chemistry', path:'/something', icon:null}];

   return buttonConfig.map((button, i) => <Button key={i} config={button} />);
};

export default withRouter(ButtonManager);