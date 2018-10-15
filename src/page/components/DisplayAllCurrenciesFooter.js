import React, { Component } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActionsWrapped from "./TablePaginationComponent";

class Footer extends Component {
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

export const DisplayAllCurrenciesFooter = Footer;
