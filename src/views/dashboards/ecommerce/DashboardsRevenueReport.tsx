
import { useState, useEffect, useCallback } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import apiConnector from 'src/services/api.service'
import { Box,  Menu, MenuItem } from '@mui/material'

const initialBarSeries = [
  { name: 'Vendido', data: [] as number[] },
  { name: 'Gastado', data: [] as number[] }
]

const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const DashboardsRevenueReport = () => {
  const [barSeries, setBarSeries] = useState(initialBarSeries)
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ totalSales: 0, totalExpenses: 0, balance: 0 })
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const yearOptions = [new Date().getFullYear() - 1, new Date().getFullYear() - 2, new Date().getFullYear() - 3]
  const direction = 'ltr'

  const handleClose = () => {
    setAnchorEl(null)
  }
  const lineSeries = [
    { name: 'Last Month', data: [20, 10, 30, 16, 24, 5, 30, 23, 28, 5, 30] },
    { name: 'This Month', data: [50, 40, 60, 46, 54, 35, 70, 53, 58, 35, 60] }
  ]
  const lineOptions: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    stroke: {
      width: [1, 2],
      curve: 'smooth',
      dashArray: [5, 0]
    },
    colors: [theme.palette.divider, hexToRGBA(theme.palette.primary.main, 1)],
    grid: {
      padding: { top: -5 },
      yaxis: {
        lines: { show: false }
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    }
  }

  const getMonthShort = (monthStr: string) => {
    const [year, month] = monthStr.split('-')
    const date = new Date(Number(year), Number(month) - 1)

    return date.toLocaleString('default', { month: 'short' })
  }

  const fetchRevenueReport = useCallback(async () => {
    setLoading(true)
    try {
      const response: any = await apiConnector.get('/dashboards/monthly-revenue-expense-report')
      const data = response
      setCategories(data.map((item: any) => getMonthShort(item.month)))
      setBarSeries([
        { name: 'Earning', data: data.map((item: any) => item.sales) },
        { name: 'Expense', data: data.map((item: any) => -item.expenses) }
      ])
      const totalSales = data.reduce((acc: number, item: any) => acc + (item.sales || 0), 0)
      const totalExpenses = data.reduce((acc: number, item: any) => acc + (item.expenses || 0), 0)
      const balance = totalSales - totalExpenses
      setStats({ totalSales, totalExpenses, balance })
    } catch (error) {
      setBarSeries(initialBarSeries)
      setCategories([])
      setStats({ totalSales: 0, totalExpenses: 0, balance: 0 })
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchRevenueReport()
  }, [fetchRevenueReport])

  const barOptions: ApexOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      lineCap: 'round',
      colors: [theme.palette.background.paper]
    },
    colors: [hexToRGBA(theme.palette.primary.main, 1), hexToRGBA(theme.palette.warning.main, 1)],
    legend: {
      offsetY: -5,
      offsetX: -30,
      position: 'top',
      fontSize: '13px',
      horizontalAlign: 'left',
      fontFamily: theme.typography.fontFamily,
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 4,
        horizontal: 10
      },
      markers: {
        width: 12,
        height: 12,
        radius: 10,
        offsetY: 1,
    offsetX: -4
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '40%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      yaxis: {
        lines: { show: false }
      },
      padding: {
        left: -15,
        right: -10,
        bottom: -12
      }
    },
    xaxis: {
      axisTicks: { show: false },
      crosshairs: { opacity: 0 },
      axisBorder: { show: false },
      categories: categories,
      labels: {
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize as string
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -15,
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize as string
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          chart: { height: 321 },
          plotOptions: {
            bar: { columnWidth: '45%' }
          }
        }
      },
      {
        breakpoint: 1380,
        options: {
          plotOptions: {
            bar: { columnWidth: '55%' }
          }
        }
      },
      {
        breakpoint: 1290,
        options: {
          chart: { height: 421 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 321 },
          plotOptions: {
            bar: { columnWidth: '40%' }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: {
            bar: { columnWidth: '50%' }
          }
        }
      },
      {
        breakpoint: 680,
        options: {
          plotOptions: {
            bar: { columnWidth: '60%' }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: { columnWidth: '50%' }
          }
        }
      },
      {
        breakpoint: 450,
        options: {
          plotOptions: {
            bar: { columnWidth: '55%' }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <Grid container>
        <StyledGrid
          item
          sm={8}
          xs={12}
          sx={{
            '& .apexcharts-series[rel="1"]': { transform: 'translateY(-6px)' },
            '& .apexcharts-series[rel="2"]': { transform: 'translateY(-9px)' }
          }}
        >
          <CardHeader title='Informe de ingresos' />
          <CardContent>
            {loading ? (
              <Typography variant='body2'>Cargando datos...</Typography>
            ) : (
              <ReactApexcharts type='bar' height={301} series={barSeries} options={barOptions} />
            )}
          </CardContent>
        </StyledGrid>
        <Grid item xs={12} sm={4}>
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Menu
              keepMounted
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl)}
              anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
            >
              {yearOptions.map((year: number) => (
                <MenuItem key={year} onClick={handleClose}>
                  {year}
                </MenuItem>
              ))}
            </Menu>
            <Typography variant='h6' sx={{ mb: 2 }}>Estadísticas anuales</Typography>
            <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Typography variant='body1'>Ventas totales:</Typography>
              <Typography variant='h5' color='primary'>${stats.totalSales.toLocaleString()}</Typography>
              <Typography variant='body1'>Gastos totales:</Typography>
              <Typography variant='h5' color='error'>${stats.totalExpenses.toLocaleString()}</Typography>
              <Typography variant='body1'>Balance anual:</Typography>
              <Typography variant='h5' color={stats.balance >= 0 ? 'success.main' : 'error'}>${stats.balance.toLocaleString()}</Typography>
            </Box>
            <ReactApexcharts type='line' height={80} series={lineSeries} options={lineOptions} />
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default DashboardsRevenueReport
