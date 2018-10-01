import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import currencies from "./test/currencies.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Card from "@material-ui/core/Card";

class DisplayAllCurrencies extends Component {
  render() {
    //console.log(JSON.stringify(currencies));
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Available currencies</h1>
          </header>
          <Grid container spacing={24}>
            {currencies.map((object, i) => {
              return (
                <Grid item xs={6} obj={object} key={i}>
                  <Card>
                    <Link
                      to={{
                        pathname: `/#/currency/${object.id}`,
                        object: object
                      }}
                    >
                      ID: {object.id} Type: {object.attributes.currency_type}{" "}
                      Symbol: {object.attributes.symbol}
                    </Link>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}
export const DisplayAllCurrenciesComponent = withRouter(DisplayAllCurrencies);
