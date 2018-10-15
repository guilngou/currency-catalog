import React, { PureComponent } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

class Item extends PureComponent {
  render() {
    const { currency } = this.props;
    return (
      <Grid item xs={6} sm={3} md={2}>
        <Card>
          <Link
            to={{
              pathname: `/#/currency/${currency.id}`,
              object: currency
            }}
            style={{ color: "#000" }}
          >
            name: {currency.name} symbol: {currency.symbol} price:{" "}
            {Math.round(currency.quotes.USD.price * 100000) / 100000}$
          </Link>
        </Card>
      </Grid>
    );
  }
}

export const CurrencyItem = Item;
