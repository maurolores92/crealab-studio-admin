
import ExpensesDetail from "src/views/store/expenses/detail/ExpensesDetail";
import { ExpenseDetailProvider } from "src/views/store/expenses/hooks/ExpensesDetailContext";

const ExpensesDetailView = () => {
  return (
    <ExpenseDetailProvider>
      <ExpensesDetail />
    </ExpenseDetailProvider>
  );
}

export default ExpensesDetailView;
