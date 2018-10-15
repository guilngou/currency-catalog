import React, { PureComponent } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";

class Header extends PureComponent {
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

export const DisplayAllCurrenciesHeader = Header;
