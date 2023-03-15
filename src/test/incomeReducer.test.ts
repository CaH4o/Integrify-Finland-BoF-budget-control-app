import { useAppDispatch } from "../hooks/reduxHooks";
import incomeReducer, {
  addIncome,
  deleteIncome,
  editIncome,
  sortIncomeByAmount,
} from "../redux/reducers/incomes";
import { tIncome } from "../types/tIncome";
import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite of Income reducer", function () {
  test("Test of Income reducer / initial state 1", function () {
    const incomes = incomeReducer([], { type: "any" });
    expect(incomes).toEqual([]);
  });

  test("Test of Income reducer / Initial state 2", function () {
    expect(store.getState().incomeReducer.length).toBe(0);
  });

  test("Income reducer / add Income ", function () {
    const income: tIncome = {
      id: "1231231",
      incomeSource: "Asd",
      incomeAmount: 123,
      incomeDate: "123",
    };
    store.dispatch(addIncome(income));
    expect(store.getState().incomeReducer.length).toBeGreaterThan(0);
  });

  test("Income reducer / remove Income ", function () {
    const id: string = "123123";
    const income: tIncome = {
      id,
      incomeSource: "Asd",
      incomeAmount: 123,
      incomeDate: "123",
    };
    store.dispatch(addIncome(income));
    store.dispatch(deleteIncome(id));
    expect(store.getState().incomeReducer.length).toBe(0);
  });

  test("Income reducer / edit Income ", function () {
    const income: tIncome = {
      id: "2312312",
      incomeSource: "Asd",
      incomeAmount: 0,
      incomeDate: "123",
    };
    store.dispatch(addIncome(income));
    const incomeEdit: tIncome = {
      id: "2312312",
      incomeSource: "Asd",
      incomeAmount: 5,
      incomeDate: "123",
    };
    store.dispatch(editIncome(incomeEdit));
    expect(store.getState().incomeReducer[0].incomeAmount).toBe(5);
  });

  test("Income reducer / Sort by Amount A", function () {
    const income1: tIncome = {
      id: "2312312",
      incomeSource: "Asd",
      incomeAmount: 0,
      incomeDate: "123",
    };
    const income2: tIncome = {
      id: "2312312",
      incomeSource: "Asd",
      incomeAmount: 10,
      incomeDate: "123",
    };
    const income3: tIncome = {
      id: "2312312",
      incomeSource: "Asd",
      incomeAmount: 5,
      incomeDate: "123",
    };
    const income4: tIncome = {
      id: "2312312",
      incomeSource: "Asd",
      incomeAmount: 6,
      incomeDate: "123",
    };
    store.dispatch(addIncome(income1));
    store.dispatch(addIncome(income2));
    store.dispatch(addIncome(income3));
    store.dispatch(addIncome(income4));
    store.dispatch(sortIncomeByAmount("asc"));
    expect(store.getState().incomeReducer[0].incomeAmount).toBe(0);
    expect(store.getState().incomeReducer[1].incomeAmount).toBe(5);
    expect(store.getState().incomeReducer[2].incomeAmount).toBe(6);
    expect(store.getState().incomeReducer[3].incomeAmount).toBe(10);
  });

  test("Income reducer / Sort by Amount D", function () {
    const income1: tIncome = {
      id: "2312312",
      incomeSource: "Asd",
      incomeAmount: 0,
      incomeDate: "123",
    };
    const income2: tIncome = {
      id: "2312312",
      incomeSource: "Asd",
      incomeAmount: 10,
      incomeDate: "123",
    };
    const income3: tIncome = {
      id: "2312312",
      incomeSource: "Asd",
      incomeAmount: 5,
      incomeDate: "123",
    };
    const income4: tIncome = {
      id: "2312312",
      incomeSource: "Asd",
      incomeAmount: 6,
      incomeDate: "123",
    };
    store.dispatch(addIncome(income1));
    store.dispatch(addIncome(income2));
    store.dispatch(addIncome(income3));
    store.dispatch(addIncome(income4));
    store.dispatch(sortIncomeByAmount("desc"));
    expect(store.getState().incomeReducer[0].incomeAmount).toBe(10);
    expect(store.getState().incomeReducer[1].incomeAmount).toBe(6);
    expect(store.getState().incomeReducer[2].incomeAmount).toBe(5);
    expect(store.getState().incomeReducer[3].incomeAmount).toBe(0);
  });
});
