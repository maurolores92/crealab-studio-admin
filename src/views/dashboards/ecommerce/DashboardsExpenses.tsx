import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState, useCallback } from 'react'
import apiConnector from 'src/services/api.service'
import { ApexOptions } from 'apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const DashboardsExpenses = () => {
  const theme = useTheme()
  const [stats, setStats] = useState<{ totalLast30Days: number, percent: number } | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      const res = await apiConnector.get<any>('/dashboards/total-last-30-days')
      setStats({
        totalLast30Days: res.total.totalLast30Days,
        percent: res.total.percent
      })
    } catch (err) {
      setStats(null)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: [hexToRGBA(theme.palette.warning.main, 1)],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: '64%' },
        track: {
          strokeWidth: '40%',
          background: hexToRGBA(theme.palette.customColors.trackBg, 1)
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: -3,
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.h4.fontSize as string
          }
        }
      }
    },
    grid: {
      padding: {
        bottom: 15
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 199 }
        }
      },
      {
        breakpoint: 430,
        options: {
          chart: { height: 150 }
        }
      }
    ]
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>
          {stats !== null && typeof stats.totalLast30Days === 'number'
            ? `$${stats.totalLast30Days.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
            : 'Cargando...'}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
          Gastos últimos 30 días
        </Typography>
        <ReactApexcharts type='radialBar' height={149} series={[stats ? Math.round(stats.percent) : 0]} options={options} />
        <Typography variant='body2' sx={{ textAlign: 'center', color: 'text.disabled' }}>
          {stats ? `${stats.percent.toFixed(2)}% respecto a los 30 días previos` : 'Sin datos previos para comparar'}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default DashboardsExpenses
