import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { DisplayAllCurrenciesComponent } from "./DisplayAllCurrencies";
import { DisplayCurrencyDetailsComponent } from "./DisplayCurrencyDetails";

class App extends Component {
  render() {
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
