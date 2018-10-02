import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
//import currencies from "./test/currencies.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Card from "@material-ui/core/Card";
import { getAllCurrenciesMethod } from "./getAllCurrencies";
import Select from "@material-ui/core/Select";
import TablePagination from "@material-ui/core/TablePagination";
import { withStyles } from "@material-ui/core/styles";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import { fade } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import Responsive from "react-responsive";
import MediaQuery from "react-responsive";

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const DesktopOrTablet = props => <Responsive {...props} minWidth={768} />;
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
    const { classes, count, page, rowsPerPage, theme } = this.props;

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

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 1
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

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
    //console.log("event.target.value : " + event.target.value);
    this.setState({ searchOption: event.target.value });
  };

  handleChangeSearchField = event => {
    console.log("event.target.value : " + event.target.value);
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
              {currency.quotes.USD.price}$
            </Link>
          </Card>
        </Grid>
      );
    });
    this.setState({ currenciesDisplay: currencies });
  };

  async componentWillMount() {
    try {
      const { rowsPerPage, page } = this.state;
      const currenciesFetch = await getAllCurrenciesMethod();
      const currenciesList = Object.values(currenciesFetch.data);
      console.log("currenciesList[0] : " + JSON.stringify(currenciesList[0]));
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
                {currency.quotes.USD.price}$
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
    const { classes } = this.props;
    const { currenciesDisplay, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, currenciesDisplay.length - page * rowsPerPage);
    console.log(
      "this.state.currencies.length : " + this.state.currenciesDisplay.length
    );
    console.log(
      "this.state.currencies.slice : " +
        JSON.stringify(this.state.currenciesDisplay.slice(0, 1))
    );

    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Available currencies</h1>
          </header>
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
        </div>{" "}
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
      </MuiThemeProvider>
    );
  }
}

export const DisplayAllCurrenciesComponent = withRouter(DisplayAllCurrencies);
