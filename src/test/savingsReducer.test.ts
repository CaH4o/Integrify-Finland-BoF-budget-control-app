import { useAppDispatch } from "../hooks/reduxHooks";
import savingsReducer, {
  setSavings,
  resetSavings,
  setTarget,
} from "../redux/reducers/savings";
import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite of savings reducer", function () {
  test("Savings reducer / initial state 1", function () {
    const savingsInit = {
      savings: 0,
      target: 0,
    };
    const savings = savingsReducer(savingsInit, { type: "any" });
    expect(savings).toEqual({
      savings: 0,
      target: 0,
    });
  });

  test("savings reducer / initial state 2", function () {
    expect(store.getState().savingsReducer.savings).toBe(0);
    expect(store.getState().savingsReducer.target).toBe(0);
  });

  test("savings reducer / set savings ", function () {
    let savings: number = 100;
    store.dispatch(setSavings(savings));
    expect(store.getState().savingsReducer.savings).toEqual(100);
    savings = 50;
    store.dispatch(setSavings(savings));
    expect(store.getState().savingsReducer.savings).toEqual(50);
  });

  test("savings reducer / set savings ", function () {
    let target: number = 10;
    store.dispatch(setTarget(target));
    expect(store.getState().savingsReducer.target).toEqual(10);
    target = 5;
    store.dispatch(setTarget(target));
    expect(store.getState().savingsReducer.target).toEqual(5);
  });
  
  test("savings reducer / reset savings ", function () {
    const savings1: number = 100;
    store.dispatch(setSavings(savings1));
    store.dispatch(resetSavings());
    expect(store.getState().savingsReducer.savings).toEqual(0);
    const savings2: number = -150;
    store.dispatch(setSavings(savings2));
    store.dispatch(resetSavings());
    expect(store.getState().savingsReducer.savings).toEqual(0);
  });
});
