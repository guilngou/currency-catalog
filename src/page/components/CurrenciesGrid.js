import React, { PureComponent } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { CurrencyItem } from "./CurrencyItem";

class CurrenciesGridComponent extends PureComponent {
  render() {
    const { currencies } = this.props;
    return (
      <Grid container spacing={8}>
        {currencies.map(currency => {
          return <CurrencyItem key={currency.id} currency={currency} />;
        })}
      </Grid>
    );
  }
}

export const CurrenciesGrid = CurrenciesGridComponent;
