import React from 'react';
import GameList  from '../pages/GameList/index';

const Dashboard = () => {

        return (
           <>
           <h1>Try Out One of These Games, Or Make Your Own!</h1>
           {/* The '/' Main Landing Page.  To have the main page send the user to a different component, change the route in Memembo/client/src/App.js */}
           <GameList/>
           </>
        )

}

export default Dashboard;
