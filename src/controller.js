import React, { Component } from "react";
import { getHundredCurrencies } from "./network/getHundredCurrencies";

class Controller extends Component {
  constructor() {
    super();
    this.state = {
      currenciesList: [],
      error: "",
      searchOption: "name",
      searchField: "",
      rowsPerPage: 10,
      page: 0
    };
  }

  componentDidMount() {
    this.fetch();
  }

  onFilterChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onPageChange = (event, page) => {
    this.setState({ page });
  };

  onRowsChange = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  async fetch() {
    try {
      const currenciesFetch = await getHundredCurrencies();
      const currenciesList = Object.values(currenciesFetch.data);
      this.setState({ currenciesList });
    } catch (error) {
      this.setState({ error });
      console.error(error);
    }
  }

  render() {
    return this.state.currenciesList.length === 0 ? (
      <h1>No currencies available</h1>
    ) : (
      this.props.children({
        ...this.state,
        onFilterChange: this.onFilterChange,
        onPageChange: this.onPageChange,
        onRowsChange: this.onRowsChange
      })
    );
  }
}
export const CurrenciesController = Controller;
