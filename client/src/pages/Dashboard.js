import React from 'react';
import GameList  from '../pages/GameList/index';
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

const Dashboard = () => {

        return (
           <>
           <StyledContainer>
                <h1>M&#477;&#8901;mem&#8901;bo&#772; is a Crowdsourced Flash-Card Game Hub:</h1>
                <p><i class="fas fa-gamepad fa-2x"></i>Test your subject matter expertise in BEGINNER, MEDIUM, & ADVANCED modes.</p>
                <p><i class="fas fa-users fa-2x"></i>Games are available for ALL AGE RANGES and in a wide array of categories.</p>
                <p><i class="fas fa-brain fa-2x"></i>If M&#477;&#8901;mem&#8901;bo&#772; doesn't have it...CREATE YOUR OWN GAMES!</p>
           </StyledContainer>   
              
           <StyledContainer>
            <h3>Try Out One of These Games, Or Make Your Own...</h3>
            {/* The '/' Main Landing Page.  To have the main page send the user to a different component, change the route in Memembo/client/src/App.js */}
            <GameList/>
           </StyledContainer>
           </>
        )

}

export default Dashboard;
