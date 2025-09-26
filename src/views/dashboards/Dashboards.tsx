import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DashboardsStatistics from 'src/views/dashboards/ecommerce/DashboardsStatistics'
import DashboardsExpenses from 'src/views/dashboards/ecommerce/DashboardsExpenses'
import DashboardsProfit from 'src/views/dashboards/ecommerce/DashboardsProfit'
import DashboardsRevenueReport from 'src/views/dashboards/ecommerce/DashboardsRevenueReport'
import DashboardsWelcomeCard from 'src/views/dashboards/ecommerce/DashboardsWelcomeCard'
import DashboardsEarningReports from './ecommerce/DashboardsEarningReports'
import DashboardsGeneratedLeads from 'src/views/dashboards/ecommerce/DashboardsGeneratedLeads'
import DashboardsPopularProducts from './ecommerce/DashboardsPopularProducts'
import DashboardsOrders from './ecommerce/DashboardsOrders'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <DashboardsWelcomeCard />
        </Grid>
        <Grid item xs={12} md={8}>
          <DashboardsStatistics />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6} md={3} lg={6}>
              <DashboardsExpenses />
            </Grid>
            <Grid item xs={6} md={3} lg={6}>
              <DashboardsProfit />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <DashboardsGeneratedLeads />
            </Grid>
          </Grid>
        </Grid>
         <Grid item xs={12} lg={8}>
          <DashboardsRevenueReport />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DashboardsEarningReports />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DashboardsPopularProducts />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DashboardsOrders />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
