import React from 'react'

function Expense() {
    return (
      <form action="" id="formExpense">
        <div>
          <label htmlFor="expenseSource">Expense source</label>
          <input
            type="text"
            name="expenseSource"
            id="expenseSource"
            placeholder="bill of ..."
          />
        </div>
        <div>
          <label htmlFor="expenseAmount">Amount of expense</label>
          <input type="number" name="expenseAmount" id="expenseAmount" min="0" />
        </div>
        <div>
          <label htmlFor="expenseDate">Date of expense</label>
          <input type="date" name="expenseDate" id="expenseDate" />
        </div>
        <button type="button" id="btn_addExpense">Add expense</button>
      </form>
    );
  }
  
  export default Expense;