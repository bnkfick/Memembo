import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar     from './components/layout/Navbar'
import Dashboard  from './components/dashboard/Dashboard'
import CreateGame from './components/games/CreateGame'
import PlayGame   from './components/games/PlayGame'
import Search     from './components/games/Search'
import NoMatch    from "./NoMatch"



class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={ Dashboard } />
          <Route exact path='/dashboard' component={ Dashboard } />
          <Route exact path='/create' component={ CreateGame } />
          <Route exact path='/play/:id' component={ PlayGame } />
          <Route exact path='/search' component={ Search } />
          <Route component={NoMatch} />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
