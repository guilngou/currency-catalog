import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { CurrenciesController } from "./components/controller";
import { DisplayAllCurrenciesHeader } from "./components/DisplayAllCurrenciesHeader";
import { DisplayAllCurrenciesFooter } from "./components/DisplayAllCurrenciesFooter";
import { Main } from "./components/CurrenciesMain";

class DisplayAllCurrencies extends Component {
  render() {
    return (
      <CurrenciesController>
        {({ onFilterChange, onRowsChange, onPageChange, ...currencies }) => {
          const {
            rowsPerPage,
            page,
            searchField,
            searchOption,
            currenciesList
          } = currencies;
          return (
            <React.Fragment>
              <DisplayAllCurrenciesHeader
                currencies={currencies}
                onChange={onFilterChange}
              />
              <Main
                currencies={currenciesList
                  .filter((value, index, array) => {
                    return searchOption === "name"
                      ? value.name
                          .toLowerCase()
                          .includes(searchField.toLowerCase())
                      : value.symbol
                          .toLowerCase()
                          .includes(searchField.toLowerCase());
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
              />
              <DisplayAllCurrenciesFooter
                currencies={currencies}
                onPageChange={onPageChange}
                onRowsChange={onRowsChange}
              />
            </React.Fragment>
          );
        }}
      </CurrenciesController>
    );
  }
}

export const DisplayAllCurrenciesComponent = withRouter(DisplayAllCurrencies);
