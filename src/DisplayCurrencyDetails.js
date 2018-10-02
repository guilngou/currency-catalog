import React, { Component } from "react";
import { withRouter } from "react-router";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";

class DisplayCurrencyDetails extends Component {
  render() {
    const { history } = this.props;
    const currency = this.props.location.object;
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">{currency.name}</h1>
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
            {Object.entries(currency)
              .slice(1, 8)
              .map((currentValue, index) => (
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
