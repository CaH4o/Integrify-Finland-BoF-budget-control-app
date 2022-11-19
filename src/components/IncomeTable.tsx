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
  Button,
  Box
} from "@mui/material";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { tIncome } from "../types/tIncome";
import { RootState } from "../redux/store";
import { deleteIncome, sortIncomeByAmount } from "../redux/reducers/incomes";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import IncomeEdit from "./IncomeEdit";

export default function IncomeTable() {
  const dispatch = useAppDispatch();
  const balance: number = useAppSelector(
    (state: RootState) => state.balanceReducer
  );
  const incomes: tIncome[] = useAppSelector(
    (state: RootState) => state.incomeReducer
  );
  const [orderAmount, setOrderAmount] = useState<"asc" | "desc">("asc");
  const [searchIncome, setSearchIncome] = useState<tIncome[]>(incomes);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(3);
  const emptyRows: number =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchIncome.length) : 0;

  useEffect(
    function () {
      setSearchIncome(incomes);
    },
    [incomes]
  );

  useEffect(
    function () {
      if (page) setPage(0);
    },
    [searchIncome]
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

  function hendelSearchIncome(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const tempSearchIncome: tIncome[] = incomes.filter((income) => {
      return (
        income.incomeSource +
        "|" +
        income.incomeAmount +
        "|" +
        income.incomeDate
      )
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    if (tempSearchIncome.length) {
      setSearchIncome(tempSearchIncome);
    } else {
      setSearchIncome(incomes);
      //+message Note found
    }
  }

  function onCkickDeleteIncome(id: string) {
    const index: number = incomes.findIndex((i) => i.id === id);
    const amount: number = incomes[index].incomeAmount;
    if (0 > balance - amount) {
      //error, bulance is less
    } else {
      dispatch(deleteIncome(id));
    }
  }

  function sortAmount() {
    dispatch(sortIncomeByAmount(orderAmount));
    if (orderAmount === "asc") {
      setOrderAmount("desc");
    } else {
      setOrderAmount("asc");
    }
  }

  return (
    <Box className="componentTable">
      <TextField
        label="Search"
        placeholder="Search"
        type="text"
        onChange={hendelSearchIncome}
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
            {searchIncome
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((income: tIncome) => (
                <TableRow
                  key={income.id}
                  style={{
                    height: 33,
                  }}
                >
                  <TableCell align="center">{income.incomeSource}</TableCell>
                  <TableCell align="center">{income.incomeAmount}</TableCell>
                  <TableCell align="center">{income.incomeDate}</TableCell>
                  <TableCell align="center" width={10}>
                    <IncomeEdit income={income} />
                  </TableCell>
                  <TableCell align="center" width={10}>
                    <Button
                      onClick={() => onCkickDeleteIncome(income.id)}
                      color="secondary"
                    >
                      <HighlightOffIcon />
                    </Button>
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
                count={searchIncome.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
