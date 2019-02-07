import React from 'react';
import GameList  from '../pages/GameList/index';
import { Container} from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    margin: 2rem auto;
    width: 100%;
    border: 1px solid white;
    border-radius: 5px;
    padding: 1rem 1rem 0 1rem;
    background-color: rgba(19, 18, 18, 0.671);
    backdrop-filter: blur(5px);   
    -webkit-backdrop-filter: blur(5px); 
`

const Dashboard = () => {

        return (
           <StyledContainer>
           <h1>Try Out One of These Games, Or Make Your Own!</h1>
           {/* The '/' Main Landing Page.  To have the main page send the user to a different component, change the route in Memembo/client/src/App.js */}
           <GameList/>
           </StyledContainer>
        )

}

export default Dashboard;
