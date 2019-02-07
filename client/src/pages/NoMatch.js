import React, { Component } from 'react'
import { Container} from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    margin: 2rem auto;
    width: 100%;
    height: 25rem;
    border: 1px solid white;
    border-radius: 5px;
    padding: 7rem 1rem 0 1rem;
    background-color: rgba(19, 18, 18, 0.671);
    backdrop-filter: blur(5px);   
    -webkit-backdrop-filter: blur(5px); 

    h1, h3 {
        text-align: center;
        /* line-height: 25rem; */
    }

    h1 {
        border-bottom: 1px solid white;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
    }
`
const StyledSpan = styled.span`
    font-size: 3rem;
    font-family: 'Fredericka the Great', cursive;
`

function NoMatch() {
    return (
        <StyledContainer>
            <h1>
                <span role="img" aria-label="Face With Rolling Eyes Emoji">🙄</span>  404 PAGE NOT FOUND
            </h1>
            <h3>Please Reflect on What You Did Wrong</h3>
            <h3>&</h3>
            <h3><StyledSpan>M&#477;&#8901;mem&#8901;bo&#772;&nbsp;&nbsp;</StyledSpan>Not To Do That Again...</h3>
            
        </StyledContainer>

    );
}

export default NoMatch;
