import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header     from './components/layout/Header'
import Dashboard  from './components/dashboard/Dashboard'
import CreateGame from './components/games/CreateGame'
import PlayGame   from './components/games/PlayGame'
import Search     from './components/games/Search'
import NoMatch    from "./NoMatch"
import "./App.css";
import styled from 'styled-components'



class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Header />
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
