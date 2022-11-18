import React, { useState, useEffect } from "react";
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
  TableSortLabel,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";

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
  const [orderAmount, setOrderAmount] = useState<"asc" | "desc">("asc");
  const [searchExpense, setSearchExpense] = useState<tExpense[]>(expenses);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchExpense.length) : 0;

  useEffect(
    function () {
      setSearchExpense(expenses);
    },
    [expenses]
  );

  useEffect(
    function () {
      if (page) setPage(0);
    },
    [searchExpense]
  );

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function hendelSearchExpense(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const tempSearchExpense: tExpense[] = expenses.filter((expense) => {
      return (
        expense.expenseSource +
        "|" +
        expense.expenseAmount +
        "|" +
        expense.expenseDate
      )
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    if (tempSearchExpense.length) {
      setSearchExpense(tempSearchExpense);
    } else {
      setSearchExpense(expenses);
      //+message Note found
    }
  }

  function onCkickDeleteExpenses(id: string) {
    dispatch(deleteExpenses(id));
  }

  function sortAmount() {
    dispatch(sortExpensesByAmount(orderAmount));
    if (orderAmount === "asc") {
      setOrderAmount("desc");
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
        onChange={hendelSearchExpense}
      />

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">
                <TableSortLabel onClick={sortAmount} direction={orderAmount}>
                  Amount
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell width={10} align="center">
                Edit
              </TableCell>
              <TableCell width={10} align="center">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchExpense
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  style={{
                    height: 33,
                  }}
                >
                  <TableCell align="center">{row.expenseSource}</TableCell>
                  <TableCell align="center">{row.expenseAmount}</TableCell>
                  <TableCell align="center">{row.expenseDate}</TableCell>
                  <TableCell
                    //onClick={() => onCkick(row.id)}
                    align="center"
                  >
                    <FlipCameraAndroidIcon />
                  </TableCell>
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
                count={searchExpense.length}
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
