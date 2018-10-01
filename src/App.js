import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import currencies from "./test/currencies.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DisplayAllCurrenciesComponent } from "./DisplayAllCurrencies";
import { DisplayCurrencyDetailsComponent } from "./DisplayCurrencyDetails";

class App extends Component {
  render() {
    console.log(JSON.stringify(currencies));
    return (
      <MuiThemeProvider>
        <div>
          <Router>
            <div>
              <Route exact path="/" component={DisplayAllCurrenciesComponent} />
              <Route
                path="/#/currency/:id"
                component={DisplayCurrencyDetailsComponent}
              />
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
