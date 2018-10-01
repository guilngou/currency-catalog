import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
//import currencies from "./test/currencies.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Card from "@material-ui/core/Card";
import { getAllCurrenciesMethod } from "./getAllCurrencies";

class DisplayAllCurrencies extends Component {
  constructor() {
    super();
    this.state = {
      currencies: []
    };
  }

  async componentWillMount() {
    try {
      const currenciesFetch = await getAllCurrenciesMethod();
      console.log(
        "currenciesFetch.data : " + JSON.stringify(currenciesFetch.data)
      );

      const currenciesList = Object.values(currenciesFetch.data);
      const currencies = currenciesList.map((currency, i) => {
        console.log("currency : " + JSON.stringify(currency));
        return (
          <Grid item xs={6}>
            <Card>
              <Link
                to={{
                  pathname: `/#/currency/${currency.id}`,
                  object: currency
                }}
              >
                name: {currency.name} symbol: {currency.symbol} price:{" "}
                {currency.quotes.USD.price}$
              </Link>
            </Card>
          </Grid>
        );
      });
      this.setState({ currencies: currencies });
      console.log("currencies : " + JSON.stringify(currencies));
      console.log("this.state: " + JSON.stringify(this.state));
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Available currencies</h1>
          </header>
          <Grid container spacing={24}>
            {this.state.currencies}
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}
export const DisplayAllCurrenciesComponent = withRouter(DisplayAllCurrencies);
