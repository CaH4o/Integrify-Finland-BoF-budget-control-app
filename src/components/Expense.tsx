import React, { useState } from "react";

import { tExpenseProp } from "../types/tExpenseProp";
import { tExpense } from "../types/tExpense";

function Expense({ expenses, setExpenses, balanceAmount }: tExpenseProp) {
  const [expenseSource, setExpenseSource] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenseDate, setExpenseDate] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!expenseSource) {
      setMessage('Error: The field "Source" is empty');
      setTimeout(function () {
        setMessage("");
      }, 3000);
      return;
    }
    if (!expenseAmount) {
      setMessage('Error: The field "Amount" is empty');
      setTimeout(function () {
        setMessage("");
      }, 3000);
      return;
    }
    if (!expenseDate) {
      setMessage('Error: The field "Date" is empty');
      setTimeout(function () {
        setMessage("");
      }, 3000);
      return;
    }
    if (balanceAmount >= expenseAmount) {
      const expense: tExpense = {
        id: Date.now().toString(),
        expenseSource,
        expenseAmount,
        expenseDate,
      };
      setExpenseSource("");
      setExpenseAmount(0);
      setExpenseDate("");
      setExpenses([expense, ...expenses]);
    } else {
      setMessage("Error: Balance is less then you need");
      setTimeout(function () {
        setMessage("");
      }, 3000);
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
            value={expenseSource}
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
            step={0.01}
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(Number(e.target.value))}
            onFocus={(e) => (e.target.value === "0" && (e.target.value = ""))}
          />
        </div>
        <div>
          <label htmlFor="expenseDate">Date of expense</label>
          <input
            type="date"
            name="expenseDate"
            id="expenseDate"
            value={expenseDate}
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
                <span>
                  Amount:{" "}
                  {new Intl.NumberFormat("fi", {
                    style: "currency",
                    currency: "EUR",
                  }).format(expense.expenseAmount)}
                </span>
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
              {new Intl.NumberFormat("fi", {
                style: "currency",
                currency: "EUR",
              }).format(
                expenses.reduce((prev, curr) => prev + curr.expenseAmount, 0)
              )}
            </b>
          </span>
        </div>
      )}
      {message.length > 0 && <span className="error">{message}</span>}
    </section>
  );
}

export default Expense;
