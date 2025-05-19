import { createContext, useEffect, useState } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Grid, Box } from "@mui/material/"

import "./styles/App.css"
import Nav from "./components/Nav"
import IncomeSection from "./components/Income"
import ExpenseSection from "./components/Expense"
import SavingsTargetSection from "./components/SavingsTarget"
import BalanceSection from "./components/Balance"
import { tIncome } from "./types/tIncome"
import { tExpense } from "./types/tExpense"
import { tContext } from "./types/tContext"
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks"
import { RootState } from "./redux/store"
import { setBalance } from "./redux/reducers/balance"

export const ThemeContext = createContext<tContext>({
  toggleMode: () => {},
})

function App() {
  const dispatch = useAppDispatch()
  const [mode, setMode] = useState<"light" | "dark">("light")
  const incomes: tIncome[] = useAppSelector(
    (state: RootState) => state.incomeReducer
  )
  const expenses: tExpense[] = useAppSelector(
    (state: RootState) => state.expenseReducer
  )
  const savings: number = useAppSelector(
    (state: RootState) => state.savingsReducer.savings
  )

  const incomeAmountTotal = incomes.reduce(function (prev, curr) {
    return prev + curr.incomeAmount
  }, 0)
  const expansesAmountTotal = expenses.reduce(function (prev, curr) {
    return prev + curr.expenseAmount
  }, 0)
  useEffect(
    function () {
      dispatch(setBalance(incomeAmountTotal - expansesAmountTotal - savings))
    },
    [
      incomes,
      expenses,
      savings,
      expansesAmountTotal,
      incomeAmountTotal,
      dispatch,
    ]
  )

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#F8EDE3" },
            secondary: { main: "#D0B8A8" },
            divider: "#DFD3C3",
            text: {
              primary: "#7D6E83",
              secondary: "#7D6E83",
            },
            background: { default: "#fff" },
          }
        : {
            primary: { main: "#3F3B6C" },
            secondary: { main: "#9F73AB" },
            divider: "#624F82",
            text: {
              primary: "#A3C7D6",
              secondary: "#A3C7D6",
            },
            background: { default: "#000" },
          }),
    },
  })

  const manageTheme = {
    toggleMode: function () {
      setMode((mode) => (mode === "light" ? "dark" : "light"))
    },
  }

  return (
    <div className="root">
      <ThemeContext.Provider value={manageTheme}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Nav />
            <Grid
              container
              spacing={0.5}
              justifyContent="center"
              alignItems="start"
              sx={{ flexGrow: 1 }}
            >
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <IncomeSection />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <ExpenseSection />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <SavingsTargetSection />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <BalanceSection />
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
