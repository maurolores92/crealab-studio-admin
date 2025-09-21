import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import { ThemeColor } from 'src/@core/layouts/types'
import { useEffect, useState, useCallback } from 'react'
import apiConnector from 'src/services/api.service'
import CustomAvatar from 'src/@core/components/mui/avatar'

interface DataType {
  icon: string
  stats: string
  title: string
  color: ThemeColor
}


const DashboardsStatistics = () => {
  const [stats, setStats] = useState<{ sales: number, customers: number, products: number, expenses: number } | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      const res = await apiConnector.get<{ sales: number, customers: number, products: number, expenses: number }>('/dashboards/get-stats')
      setStats(res)
    } catch (err) {
      setStats(null)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const data: DataType[] = [
    {
      stats: stats?.sales?.toLocaleString?.('es-AR') ?? '...',
      title: 'Ventas',
      color: 'primary',
      icon: 'tabler:chart-pie-2'
    },
    {
      color: 'info',
      stats: stats?.customers?.toLocaleString?.('es-AR') ?? '...',
      title: 'Clientes',
      icon: 'tabler:users'
    },
    {
      color: 'error',
      stats: stats?.products?.toLocaleString?.('es-AR') ?? '...',
      title: 'Productos',
      icon: 'tabler:shopping-cart'
    },
    {
      stats: stats?.expenses !== undefined && typeof stats?.expenses === 'number'
        ? `$${stats.expenses.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
        : '...',
      color: 'success',
      title: 'Gastos',
      icon: 'tabler:currency-dollar'
    }
  ]

  const renderStats = () => {
    return data.map((sale: DataType, index: number) => (
    <Grid item xs={6} md={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={sale.icon} fontSize='1.5rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>{sale.stats}</Typography>
          <Typography variant='body2'>{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

  return (
    <Card>
      <CardHeader
        title='Estadisticas'
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
        action={
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            Actualizado recientemente
          </Typography>
        }
      />
      <CardContent
        sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(7.5)} !important` }}
      >
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default DashboardsStatistics
