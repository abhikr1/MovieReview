import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './HomePage.js';
import MovieDetailPage from './MovieDetailPage.js';
import LoginPage from './LoginPage.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (

  <Router>
          <Switch>
          <Route exact path='/'  component={HomePage} />
          <Route exact path='/movies/:movieId' component={MovieDetailPage} />
          <Route exact path='/login' component={LoginPage}/>
          </Switch>
          </Router>
  )}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
