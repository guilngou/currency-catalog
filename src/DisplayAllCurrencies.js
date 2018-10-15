import React, { Component, PureComponent } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TablePagination from "@material-ui/core/TablePagination";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import TablePaginationActionsWrapped from "./components/TablePaginationComponent";
import { CurrenciesController } from "./controller";

class DisplayAllCurrenciesHeader extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <h1>Available currencies</h1>
        <SearchIcon />
        <Input
          placeholder="Search…"
          disableUnderline
          value={this.props.currencies.searchField}
          name="searchField"
          onChange={this.props.onChange}
        />
        <select
          value={this.props.currencies.searchOption}
          name="searchOption"
          onChange={this.props.onChange}
        >
          <option value="name">name</option>
          <option value="symbol">symbol</option>
        </select>
      </React.Fragment>
    );
  }
}

class CurrencyItem extends PureComponent {
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

class CurrenriesGrid extends PureComponent {
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

class Main extends PureComponent {
  render() {
    const { currencies } = this.props;
    return <CurrenriesGrid currencies={currencies} />;
  }
}

class DisplayAllCurrenciesFooter extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <TablePagination
        colSpan={3}
        count={currencies.currenciesList.length}
        rowsPerPage={currencies.rowsPerPage}
        rowsPerPageOptions={[10, 50, 100]}
        page={currencies.page}
        onChangePage={this.props.onPageChange}
        onChangeRowsPerPage={this.props.onRowsChange}
        ActionsComponent={TablePaginationActionsWrapped}
        labelRowsPerPage={""}
      />
    );
  }
}

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
