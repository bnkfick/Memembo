import React from "react";
import { Alert, Col } from 'reactstrap';
import styled from 'styled-components';

const MessageBar = styled(Col)`
    background-color: rgba(19, 18, 18, 0.45);
    backdrop-filter: blur(5px);   
    -webkit-backdrop-filter: blur(5px); 
    border-radius: 10px;
    padding-top: 1rem;
    margin-bottom: 1rem;
    border: 1px solid white;
    font-size: 1.5rem;
    h4 {
        border-bottom: 1px solid white;
    }
`
const Msg = styled.div`

    background-color: ${ props => props.color  ? props.color : "rgba(19,18,18,0.45)"};
    border-radius: 10px;

    margin-bottom: 1rem;
`


function MsgBar(props) {
  return (
    <MessageBar>
    <Msg color={props.msgcolor}>{props.msg}</Msg>
    </MessageBar>
  )
}


export default MsgBar;
