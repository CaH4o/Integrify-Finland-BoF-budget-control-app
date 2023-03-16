import { useAppDispatch } from "../hooks/reduxHooks";
import expenseReducer, {
  addExpenses,
  deleteExpenses,
  editExpenses,
  sortExpensesByAmount,
} from "../redux/reducers/expenses";
import { tExpense } from "../types/tExpense";
import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite of expense reducer", function () {
  test("Expense reducer / initial state 1", function () {
    const expense = expenseReducer([], { type: "any" });
    expect(expense).toEqual([]);
  });

  test("Expense reducer / Initial state 2", function () {
    expect(store.getState().expenseReducer.length).toBe(0);
  });

  test("Expense reducer / add Expense ", function () {
    const expense: tExpense = {
      id: "1231231",
      expenseSource: "Asd",
      expenseAmount: 123,
      expenseDate: "123",
    };
    store.dispatch(addExpenses(expense));
    expect(store.getState().expenseReducer.length).toBeGreaterThan(0);
  });

  test("Expense reducer / remove expense ", function () {
    const id: string = "123123";
    const expense: tExpense = {
      id,
      expenseSource: "Asd",
      expenseAmount: 123,
      expenseDate: "123",
    };
    store.dispatch(addExpenses(expense));
    store.dispatch(deleteExpenses(id));
    expect(store.getState().expenseReducer.length).toBe(0);
  });

  test("Expense reducer / edit expense ", function () {
    const expense: tExpense = {
      id: "2312312",
      expenseSource: "Asd",
      expenseAmount: 0,
      expenseDate: "123",
    };
    store.dispatch(addExpenses(expense));
    const expenseEdit: tExpense = {
      id: "2312312",
      expenseSource: "Asd",
      expenseAmount: 5,
      expenseDate: "123",
    };
    store.dispatch(editExpenses(expenseEdit));
    expect(store.getState().expenseReducer[0].expenseAmount).toBe(5);
  });

  test("Expense reducer / Sort by Amount A", function () {
    const expense1: tExpense = {
      id: "2312312",
      expenseSource: "Asd",
      expenseAmount: 0,
      expenseDate: "123",
    };
    const expense2: tExpense = {
      id: "2312312",
      expenseSource: "Asd",
      expenseAmount: 10,
      expenseDate: "123",
    };
    const expense3: tExpense = {
      id: "2312312",
      expenseSource: "Asd",
      expenseAmount: 5,
      expenseDate: "123",
    };
    const expense4: tExpense = {
      id: "2312312",
      expenseSource: "Asd",
      expenseAmount: 6,
      expenseDate: "123",
    };
    store.dispatch(addExpenses(expense1));
    store.dispatch(addExpenses(expense2));
    store.dispatch(addExpenses(expense3));
    store.dispatch(addExpenses(expense4));
    store.dispatch(sortExpensesByAmount("asc"));
    expect(store.getState().expenseReducer[0].expenseAmount).toBe(0);
    expect(store.getState().expenseReducer[1].expenseAmount).toBe(5);
    expect(store.getState().expenseReducer[2].expenseAmount).toBe(6);
    expect(store.getState().expenseReducer[3].expenseAmount).toBe(10);
  });

  test("Expense reducer / Sort by Amount D", function () {
    const expense1: tExpense = {
      id: "2312312",
      expenseSource: "Asd",
      expenseAmount: 0,
      expenseDate: "123",
    };
    const expense2: tExpense = {
      id: "2312312",
      expenseSource: "Asd",
      expenseAmount: 10,
      expenseDate: "123",
    };
    const expense3: tExpense = {
      id: "2312312",
      expenseSource: "Asd",
      expenseAmount: 5,
      expenseDate: "123",
    };
    const expense4: tExpense = {
      id: "2312312",
      expenseSource: "Asd",
      expenseAmount: 6,
      expenseDate: "123",
    };
    store.dispatch(addExpenses(expense1));
    store.dispatch(addExpenses(expense2));
    store.dispatch(addExpenses(expense3));
    store.dispatch(addExpenses(expense4));
    store.dispatch(sortExpensesByAmount("desc"));
    expect(store.getState().expenseReducer[0].expenseAmount).toBe(10);
    expect(store.getState().expenseReducer[1].expenseAmount).toBe(6);
    expect(store.getState().expenseReducer[2].expenseAmount).toBe(5);
    expect(store.getState().expenseReducer[3].expenseAmount).toBe(0);
  });
});
