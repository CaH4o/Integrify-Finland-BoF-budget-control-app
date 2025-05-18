import balanceReducer, {
  setBalance,
  addBalance,
  resetBalance,
} from "../redux/reducers/balance";
import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite of Balance reducer", function () {
  test("Balance reducer / initial state 1", function () {
    const balance = balanceReducer(0, { type: "any" });
    expect(balance).toEqual(0);
  });

  test("Balance reducer / initial state 2", function () {
    expect(store.getState().balanceReducer).toBe(0);
  });

  test("Balance reducer / set balance ", function () {
    let balance: number = 100;
    store.dispatch(setBalance(balance));
    expect(store.getState().balanceReducer).toEqual(100);
    balance = 50;
    store.dispatch(setBalance(balance));
    expect(store.getState().balanceReducer).toEqual(50);
  });

  test("balance reducer / add balance ", function () {
    const balance: number = 100;
    store.dispatch(setBalance(balance));
    expect(store.getState().balanceReducer).toEqual(100);
    const addToBalance1: number = 50;
    store.dispatch(addBalance(addToBalance1));
    expect(store.getState().balanceReducer).toEqual(150);
    const addToBalance2: number = -150;
    store.dispatch(addBalance(addToBalance2));
    expect(store.getState().balanceReducer).toEqual(0);
  });

  test("balance reducer / reset balance ", function () {
    const balance1: number = 100;
    store.dispatch(setBalance(balance1));
    store.dispatch(resetBalance());
    expect(store.getState().balanceReducer).toEqual(0);
    const balance2: number = -150;
    store.dispatch(addBalance(balance2));
    store.dispatch(resetBalance());
    expect(store.getState().balanceReducer).toEqual(0);
  });
});
