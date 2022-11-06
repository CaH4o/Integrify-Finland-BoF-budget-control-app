import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { tExpense } from "../types/tExpense";
import { RootState } from "../redux/store";
import {
  deleteExpenses,
  sortExpensesByAmount,
} from "../redux/reducers/expenses";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

function ExpenseTable() {
  const dispatch = useAppDispatch();
  const expenses: tExpense[] = useAppSelector(
    (state: RootState) => state.expenseReducer
  );
  const [orderAmount, setOrderAmount] = useState<"asc" | "dsc">("asc");
  const [searchExpense, setSearchExpense] = useState<string>("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            expenses.filter((item) =>
              item.expenseSource.includes(searchExpense)
            ).length
        )
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function onCkickDeleteExpenses(id: string) {
    dispatch(deleteExpenses(id));
  }

  function sortAmount() {
    dispatch(sortExpensesByAmount(orderAmount));
    if (orderAmount === "asc") {
      setOrderAmount("dsc");
    } else {
      setOrderAmount("asc");
    }
  }

  return (
    <>
      <TextField
        label="Search"
        placeholder="Search"
        type="text"
        onChange={(e) => setSearchExpense(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center" onClick={() => sortAmount()}>
                Amount
              </TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses
              .filter((item) => item.expenseSource.includes(searchExpense))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  style={{
                    height: 33,
                  }}
                >
                  <TableCell>{row.expenseSource}</TableCell>
                  <TableCell>{row.expenseAmount}</TableCell>
                  <TableCell>{row.expenseDate}</TableCell>
                  <TableCell
                    onClick={() => onCkickDeleteExpenses(row.id)}
                    align="right"
                  >
                    <HighlightOffIcon />
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 33 * emptyRows,
                }}
              >
                <TableCell />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                count={
                  expenses.filter((item) =>
                    item.expenseSource.includes(searchExpense)
                  ).length
                }
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

export default ExpenseTable;
