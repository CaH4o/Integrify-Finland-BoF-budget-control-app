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
//import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";

import { tIncome } from "../types/tIncome";
import { RootState } from "../redux/store";
import { deleteIncome, sortIncomeByAmount } from "../redux/reducers/incomes";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

function IncomeTable() {
  const dispatch = useAppDispatch();
  const incomes: tIncome[] = useAppSelector(
    (state: RootState) => state.incomeReducer
  );
  const [orderAmount, setOrderAmount] = useState<"asc" | "dsc">("asc");
  const [searchIncome, setSearchIncome] = useState<string>("");
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(3);
  const emptyRows: number =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            incomes.filter((item) => item.incomeSource.includes(searchIncome))
              .length
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

  function onCkickDeleteIncome(id: string) {
    dispatch(deleteIncome(id));
  }

  function sortAmount() {
    dispatch(sortIncomeByAmount(orderAmount));
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
        onChange={(e) => setSearchIncome(e.target.value)}
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
            {incomes
              .filter((item) => item.incomeSource.includes(searchIncome))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: tIncome) => (
                <TableRow
                  key={row.id}
                  style={{
                    height: 33,
                  }}
                >
                  <TableCell>{row.incomeSource}</TableCell>
                  <TableCell>{row.incomeAmount}</TableCell>
                  <TableCell>{row.incomeDate}</TableCell>
                  <TableCell
                    onClick={() => onCkickDeleteIncome(row.id)}
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
                  incomes.filter((item) =>
                    item.incomeSource.includes(searchIncome)
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

export default IncomeTable;
