import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { DisplayAllCurrenciesComponent } from "./page/DisplayAllCurrencies";
import { DisplayCurrencyDetailsComponent } from "./page/DisplayCurrencyDetails";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={DisplayAllCurrenciesComponent} />
          <Route
            path="/#/currency/:id"
            component={DisplayCurrencyDetailsComponent}
          />
        </Switch>
      </Router>
    );
  }
}
export default App;
