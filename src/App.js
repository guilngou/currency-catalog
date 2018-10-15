import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { DisplayAllCurrenciesComponent } from './DisplayAllCurrencies';
import { DisplayCurrencyDetailsComponent } from './DisplayCurrencyDetails';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={DisplayAllCurrenciesComponent} />
              <Route path="/#/currency/:id" component={DisplayCurrencyDetailsComponent} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
