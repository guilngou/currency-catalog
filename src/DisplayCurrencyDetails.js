import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import currencies from "./test/currencies.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import ListItem from "@material-ui/core/ListItem";

class DisplayCurrencyDetails extends Component {
  render() {
    const { history } = this.props;
    const currency = this.props.location.object;
    const currencyAttributes = currency.attributes;
    console.log("currency :" + JSON.stringify(currency));
    console.log("currency.attributes :" + JSON.stringify(currency.attributes));
    console.log(
      "Object.entries(currencyAttributes) :" +
        JSON.stringify(Object.entries(currencyAttributes))
    );

    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">{currency.id}</h1>
            <Button
              variant="contained"
              onClick={() => {
                history.push("/");
              }}
            >
              Back
            </Button>
          </header>
          <ul>
            {Object.entries(currencyAttributes).map((currentValue, index) => (
              <ListItem>{currentValue[0] + ": " + currentValue[1]}</ListItem>
            ))}
          </ul>
        </div>
      </MuiThemeProvider>
    );
  }
}
export const DisplayCurrencyDetailsComponent = withRouter(
  DisplayCurrencyDetails
);

//<ListItem key={currencies.toString()} value={currencies} />
