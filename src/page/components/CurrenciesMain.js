import React, { PureComponent } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { CurrenciesGrid } from "./CurrenciesGrid";

class CurrenciesMain extends PureComponent {
  render() {
    const { currencies } = this.props;
    return <CurrenciesGrid currencies={currencies} />;
  }
}

export const Main = CurrenciesMain;
