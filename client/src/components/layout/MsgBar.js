import React from "react";
import { Alert } from 'reactstrap';
import styled from 'styled-components';

const StyledBar = styled.div`
    background-color: #eaeaea;
    margin-top: 1em;
`

const Text = styled.div`
    padding-top: .5em;
    background-color: #eaeaea;
    color: #333;
`

const Score = styled.div`
    background-color: #eaeaea;
    text-align: right;
    padding-right: 1em;
    padding-bottom: .5em;
    color: #333;
`


function MsgBar(props) {
  return (
    <StyledBar>
    <Alert color={props.msgcolor}>{props.msg}</Alert>
    <Score>
          <div>SCORE: {props.score} | TOP SCORE: {props.highScore}</div>
    </Score>
    </StyledBar>
  )
}


export default MsgBar;
