import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState, useCallback } from 'react'
import apiConnector from 'src/services/api.service'
import { ApexOptions } from 'apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const series = [{ data: [0, 19, 7, 27, 15, 40] }]

const DashboardsProfit = () => {
  const theme = useTheme()
  const [totalSales, setTotalSales] = useState<number | null>(null)

  const fetchTotalSales = useCallback(async () => {
    try {
      const res = await apiConnector.get<{ total: number }>('/dashboards/total-sales-last-30-days')
      setTotalSales(res.total)
    } catch (err) {
      setTotalSales(null)
    }
  }, [])

  useEffect(() => {
    fetchTotalSales()
  }, [fetchTotalSales])

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    stroke: { width: 2 },
    tooltip: { enabled: false },
    colors: [hexToRGBA(theme.palette.info.main, 1)],
    markers: {
      size: 3.5,
      strokeWidth: 3,
      strokeColors: 'transparent',
      colors: [theme.palette.info.main],
      discrete: [
        {
          size: 5,
          seriesIndex: 0,
          strokeColor: theme.palette.info.main,
          fillColor: theme.palette.background.paper,
          dataPointIndex: series[0].data.length - 1
        }
      ]
    },
    grid: {
      strokeDashArray: 6,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -13,
        left: -4,
        right: 8,
        bottom: 2
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          chart: { height: 113 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 118 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: { height: 98 }
        }
      },
      {
        breakpoint: 650,
        options: {
          chart: { height: 118 }
        }
      },
      {
        breakpoint: 430,
        options: {
          chart: { height: 94 }
        }
      },
      {
        breakpoint: 401,
        options: {
          chart: { height: 114 }
        }
      }
    ]
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>Ventas</Typography>
        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
          Ultimos 30 dias
        </Typography>
        <ReactApexcharts type='line' height={93} series={series} options={options} />
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h4'>
            {totalSales !== null ? `$${totalSales.toLocaleString('es-AR', { minimumFractionDigits: 2 })}` : 'Cargando...'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DashboardsProfit
