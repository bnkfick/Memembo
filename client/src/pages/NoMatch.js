import React, { Component } from 'react'
import { Container} from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    margin: 2rem auto;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
    padding:3rem;
    background-color: rgba(19, 18, 18, 0.85);
    backdrop-filter: blur(5px);   
    -webkit-backdrop-filter: blur(5px); 

    h1 {
        border-bottom: solid white 1px;
        margin-bottom: 2rem;
    }

    h3 {
        margin-left: 2rem;
        text-align: center;
    }

    p {
        font-size: 1.5rem;
        margin-left: 2rem;
    }

    i {
        margin-right: 2rem;
    }

`
const StyledSpan = styled.span`
    font-size: 3rem;
    font-family: 'Fredericka the Great', cursive;
`
const Styledh1 = styled.h1`
    text-align: center;
`

function NoMatch() {
    return (
        <>
        <StyledContainer>
            <Styledh1>
                <span role="img" aria-label="Face With Rolling Eyes Emoji">🙄</span>  404 PAGE NOT FOUND
            </Styledh1>
            <h3>Please Reflect on What You Did Wrong</h3>
            <h3>&</h3>
            <h3><StyledSpan>M&#477;&#8901;mem&#8901;bo&#772;&nbsp;&nbsp;</StyledSpan>Not To Do That Again...</h3>
            
        </StyledContainer>

        <StyledContainer>
            <h1>Coming Soon!</h1>
            <p><i class="fas fa-calendar-check fa-2x"></i>Improved UI/UX</p>
            <p><i class="fas fa-calendar-check fa-2x"></i>High Score Tracking</p>
            <p><i class="fas fa-calendar-check fa-2x"></i>Game Search by Rating, Target Audience, #Tags</p>
            <p><i class="fas fa-calendar-check fa-2x"></i>Social Media Sharing</p>
            <p><i class="fas fa-calendar-check fa-2x"></i>Mobile Friendly w/ Reactive Native Camera Access</p>
        </StyledContainer> 
        </>
    );
}

export default NoMatch;
