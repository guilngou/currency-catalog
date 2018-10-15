import React, { PureComponent } from "react";
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActionsWrapped from "./TablePagination";

export class DisplayAllCurrenciesFooter extends PureComponent {
  render() {
    const { currencies } = this.props;
    return (
      <footer>
        <TablePagination
          component="div"
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
      </footer>
    );
  }
}
