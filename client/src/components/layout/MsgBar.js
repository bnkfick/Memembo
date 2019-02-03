import React from "react";
import styled from 'styled-components';

const StyledBar = styled.div`
    background-color: #eaeaea;
`

const Text = styled.div`
    padding-top: .5em;
    background-color: #eaeaea;
    color: #333;
`

const Score = styled.div`
    background-color: #eaeaea;
    text-align: right;
    padding: 1em;
    color: #333;
`


function MsgBar(props) {
  return (
    <StyledBar>
      <Text>{props.msg}</Text>
        <Score>
          <div>SCORE: {props.score}</div>
          <div>TOP SCORE: {props.highScore}</div>
        </Score>
    </StyledBar>
  )
}


export default MsgBar;
