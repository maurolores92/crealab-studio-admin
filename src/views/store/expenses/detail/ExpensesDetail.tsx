import { Grid } from "@mui/material"
import { useCallback, useEffect, } from "react"
import BasicInfoCard from "./components/BasicInfoCard";
import ExpenseCard from "./components/ExpenseCard";
import { useRouter } from "next/router";
import { useExpenseDetail } from "../hooks/ExpensesDetailContext";
import apiConnector from "src/services/api.service";

const ExpensesDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const {expenses, setExpenses} = useExpenseDetail();

  const getExpenses = useCallback(async () => {
    try {
      const result: any = await apiConnector.get(`/expenses/${id}`)
      setExpenses(result)
    } catch (error) {
      console.log(error)
    }
  }, [id, setExpenses]);

  useEffect(() => {
    if (id) {
      getExpenses();
    }
  }, [id, getExpenses]);

  return expenses ? <>

    <Grid container spacing={2}>
      <Grid item lg={12} xs={12}>
        <BasicInfoCard expense={expenses} refresh={getExpenses}/>
      </Grid>
      <Grid item xs={12} md={4}>
      </Grid>
      <Grid item xs={12} md={8}>
        <ExpenseCard
          items={expenses.items}
          refresh={getExpenses}
        />
      </Grid>
    </Grid>
    </>
  : <></>
}

export default ExpensesDetail
