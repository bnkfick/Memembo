import React from "react";
import { Alert, Col } from 'reactstrap';
import styled from 'styled-components';

const MessageBar = styled(Col)`
    background-color: rgba(19, 18, 18, 0.45);
    backdrop-filter: blur(5px);   
    -webkit-backdrop-filter: blur(5px); 
    border-radius: 10px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border: 1px solid white;
    h4 {
        border-bottom: 1px solid white;
    }
`

const Score = styled.div`
    background-color: #eaeaea;
    border-radius: 10px;
    text-align: right;
    padding-right: 1em;
    padding-bottom: .5em;
    color: #333;
`


function MsgBar(props) {
  return (
    <MessageBar>
    <Alert color={props.msgcolor}>{props.msg}</Alert>
    <Score>
          <div>SCORE: {props.score} | TOP SCORE: {props.highScore}</div>
    </Score>
    </MessageBar>
  )
}


export default MsgBar;
