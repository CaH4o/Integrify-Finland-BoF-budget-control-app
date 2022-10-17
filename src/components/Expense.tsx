import React, { useState } from "react";

import { tExpenseProp } from "../types/tExpenseProp";
import { tExpense } from "../types/tExpense";

function Expense({ expenses, setExpenses, incomesTotal, savings }: tExpenseProp) {
  const [expenseSource, setExpenseSource] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseDate, setExpenseDate] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let expansesTotal: number = expenses.reduce(function (prev, curr) {
      return prev + curr.expenseAmount;
    }, 0);
    if (!expenseSource) {
      setMessage('Error: The field "Sourse" is empty');
      return;
    }
    if (!expenseAmount) {
      setMessage('Error: The field "Amount" is empty');
      return;
    }
    if (!expenseDate) {
      setMessage('Error: The field "Date" is empty');
      return;
    }
    if (incomesTotal >= (expansesTotal + expenseAmount + savings)) {
      const expense: tExpense = {
        id: Date.now().toString(),
        expenseSource,
        expenseAmount,
        expenseDate,
      };
      setExpenses([expense, ...expenses]);
      message.length > 0 && setMessage("");
    } else {
      setMessage("Error: total income less then you have");
    }
  }

  return (
    <section>
      <form onSubmit={(e) => submit(e)} id="formExpense">
        <div>
          <label htmlFor="expenseSource">Expense source</label>
          <input
            type="text"
            name="expenseSource"
            id="expenseSource"
            placeholder="bill of ..."
            onChange={(e) => setExpenseSource(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="expenseAmount">Amount of expense</label>
          <input
            type="number"
            name="expenseAmount"
            id="expenseAmount"
            min="0"
            onChange={(e) => setExpenseAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="expenseDate">Date of expense</label>
          <input
            type="date"
            name="expenseDate"
            id="expenseDate"
            onChange={(e) => setExpenseDate(e.target.value)}
          />
        </div>
        <button type="submit" id="btn_addExpense">
          Add expense
        </button>
      </form>
      <ul id="listExpense">
        {expenses.length > 0 &&
          expenses.map((expense) => (
            <li key={expense.id}>
              <p>
                <strong>Title: {expense.expenseSource}</strong>
              </p>
              <p>
                <span>Amount: {expense.expenseAmount}</span>
              </p>
              <p>
                <em>Date: {expense.expenseDate}</em>
              </p>
            </li>
          ))}
      </ul>
      {expenses.length > 0 && (
        <div>
          <hr />
          <span>
            Total:{" "}
            <b>
              {expenses.reduce((prev, curr) => prev + curr.expenseAmount, 0)}
            </b>
          </span>
        </div>
      )}
      {message.length > 0 && <span className="error">{message}</span>}
    </section>
  );
}

export default Expense;
