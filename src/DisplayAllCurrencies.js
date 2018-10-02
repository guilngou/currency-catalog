import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Responsive from "react-responsive";
import { getAllCurrenciesMethod } from "./getAllCurrencies";
import PropTypes from "prop-types";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TablePagination from "@material-ui/core/TablePagination";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";

const Desktop = props => <Responsive {...props} minWidth={992} />;
const TabletOrMobile = props => <Responsive {...props} maxWidth={991} />;

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNumberButtonClick = event => {
    this.props.onChangePage(event, event);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage } = this.props;

    let pageNumbers = [];
    for (let i = 0; i < Math.ceil(count / rowsPerPage); i++) {
      pageNumbers.push(
        <Button value={i} onClick={() => this.handleNumberButtonClick(i)}>
          {i + 1}
        </Button>
      );
    }

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        {pageNumbers}
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          <LastPageIcon />
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

class DisplayAllCurrencies extends Component {
  constructor() {
    super();
    this.state = {
      currenciesList: [],
      currenciesFiltered: [],
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

    const currenciesFiltered = this.state.currenciesList.filter(
      (value, index, array) => {
        if (this.state.searchOption === "name") {
          return value.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        } else {
          return value.symbol
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        }
      }
    );
    const currencies = currenciesFiltered.map((currency, i) => {
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
    this.setState({ currenciesDisplay: currencies });
  };

  async componentWillMount() {
    try {
      const currenciesFetch = await getAllCurrenciesMethod();
      const currenciesList = Object.values(currenciesFetch.data);
      this.setState({ currenciesList });
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
      this.setState({ currenciesDisplay: currencies });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { rowsPerPage, page } = this.state;

    return (
      <MuiThemeProvider>
        <div className="App">
          <h1>Available currencies</h1>
          <SearchIcon />
          <Input
            placeholder="Search…"
            disableUnderline
            value={this.state.searchField}
            onChange={this.handleChangeSearchField}
          />
          <TextField
            select
            value={this.state.searchOption}
            onChange={this.handleChangeSearchOption}
          >
            <option value="name">name</option>
            <option value="symbol">symbol</option>
          </TextField>
          <Grid container spacing={8}>
            {this.state.currenciesDisplay.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
          </Grid>

          <Desktop>
            <TablePagination
              colSpan={3}
              count={this.state.currenciesDisplay.length}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 50, 100]}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActionsWrapped}
              labelRowsPerPage={""}
            />
          </Desktop>
          <TabletOrMobile>
            <TablePagination
              colSpan={3}
              count={this.state.currenciesDisplay.length}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 50, 100]}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              labelRowsPerPage={""}
            />
          </TabletOrMobile>
        </div>
      </MuiThemeProvider>
    );
  }
}

export const DisplayAllCurrenciesComponent = withRouter(DisplayAllCurrencies);
