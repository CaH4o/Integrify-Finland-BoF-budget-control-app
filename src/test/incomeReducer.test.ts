import { useAppDispatch } from "../hooks/reduxHooks";
import incomeReducer, { addIncome } from "../redux/reducers/incomes";

describe("Suite of Income reducer", function () {
  test("Test of Income reducer / Check initial state", function () {
    const incomes = incomeReducer([], { type: "any" });
    expect(incomes).toEqual([]);
  });
  test("Income reducer / add Income ", function () {
/*     const incomes = incomeReducer([], { type: "any" });
    const dispatch = useAppDispatch();
    dispatch(
      addIncome({
        id: "1231231",
        incomeSource: "Asd",
        incomeAmount: 123,
        incomeDate: "123",
      })
    );
    expect(incomes.length).toBeGreaterThan(incomes.length); */
  });
});
