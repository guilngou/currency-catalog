import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import currencies from "./test/currencies.json";

class App extends Component {
  render() {
    console.log(JSON.stringify(currencies));
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Available currencies</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Grid container spacing={24}>
            {currencies.map((object, i) => {
              return (
                <Grid item xs={6} obj={object} key={i}>
                  <Button variant="outlined">
                    ID: {object.id} Type: {object.attributes.currency_type}{" "}
                    Symbol: {object.attributes.symbol}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
