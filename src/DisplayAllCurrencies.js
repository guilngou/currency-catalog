import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { getAllCurrenciesMethod } from "./network/getAllCurrencies";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TablePagination from "@material-ui/core/TablePagination";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import TablePaginationActionsWrapped from "./components/TablePaginationComponent";

class DisplayAllCurrencies extends Component {
  constructor() {
    super();
    this.state = {
      currenciesList: [],
      currenciesDisplay: [],
      rowsPerPage: 10,
      page: 0,
      searchOption: "name",
      searchField: ""
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangeSearchOption = event => {
    this.setState({ searchOption: event.target.value });
  };

  handleChangeSearchField = event => {
    this.setState({ searchField: event.target.value });
    const checkSimilarity = value => {
      return value.toLowerCase().includes(event.target.value.toLowerCase());
    };
    const currenciesFiltered = this.state.currenciesList.filter(
      (value, index, array) => {
        return this.state.searchOption === "name"
          ? checkSimilarity(value.name)
          : checkSimilarity(value.symbol);
      }
    );
    const currenciesDisplay = this.renderCurrenciesGrids(currenciesFiltered);
    this.setState({ currenciesDisplay });
  };

  async componentWillMount() {
    try {
      const currenciesFetch = await getAllCurrenciesMethod();
      const currenciesList = Object.values(currenciesFetch.data);
      this.setState({ currenciesList });
      const currenciesDisplay = this.renderCurrenciesGrids(currenciesList);
      this.setState({ currenciesDisplay });
    } catch (e) {
      console.error(e);
    }
  }

  renderCurrenciesGrids = currenciesList => {
    const currencies = currenciesList.map((currency, i) => {
      return (
        <Grid item xs={6} sm={3} md={2}>
          <Card>
            <Link
              to={{
                pathname: `/#/currency/${currency.id}`,
                object: currency
              }}
            >
              name: {currency.name} symbol: {currency.symbol} price:{" "}
              {Math.round(currency.quotes.USD.price * 100000) / 100000}$
            </Link>
          </Card>
        </Grid>
      );
    });
    return currencies;
  };

  render() {
    const {
      rowsPerPage,
      page,
      searchField,
      searchOption,
      currenciesDisplay
    } = this.state;
    return (
      <MuiThemeProvider>
        <div className="App">
          <h1>Available currencies</h1>
          <SearchIcon />
          <Input
            placeholder="Search…"
            disableUnderline
            value={searchField}
            onChange={this.handleChangeSearchField}
          />
          <TextField
            select
            value={searchOption}
            onChange={this.handleChangeSearchOption}
          >
            <option value="name">name</option>
            <option value="symbol">symbol</option>
          </TextField>
          <Grid container spacing={8}>
            {!!Object.keys(currenciesDisplay).length ? (
              currenciesDisplay.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            ) : (
              <h1>No currencies available</h1>
            )}
          </Grid>
          <TablePagination
            colSpan={3}
            count={currenciesDisplay.length}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 50, 100]}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActionsWrapped}
            labelRowsPerPage={""}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export const DisplayAllCurrenciesComponent = withRouter(DisplayAllCurrencies);
