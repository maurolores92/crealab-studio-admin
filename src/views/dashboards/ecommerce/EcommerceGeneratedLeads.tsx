import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import { ApexOptions } from 'apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useCallback, useEffect, useState } from 'react'
import apiConnector from 'src/services/api.service'

const series = [32, 41, 41, 70]

const defaultPayload = {
  totalAmount: 4350,
  totalOrders: 120,
  percentChange: 15.8
}

const EcommerceGeneratedLeads = () => {
  const theme = useTheme()
  const [payload, setPayload] = useState(defaultPayload)

  const fetchOrdersStats = useCallback(async () => {
    try {
      const response: any = await apiConnector.get('/dashboards/open-orders-stats')
      if (response && response.totalAmount !== undefined) {
        setPayload(response)
      } else {
        setPayload(defaultPayload)
      }
    } catch (error) {
      setPayload(defaultPayload)
    }
    console.log('Payload de órdenes abiertas:', payload);
  }, [])

  useEffect(() => {
    fetchOrdersStats()
  }, [fetchOrdersStats])

  const options: ApexOptions = {
    colors: [
      theme.palette.success.main,
      hexToRGBA(theme.palette.success.main, 0.7),
      hexToRGBA(theme.palette.success.main, 0.5),
      hexToRGBA(theme.palette.success.main, 0.16)
    ],
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    labels: ['Electronic', 'Sports', 'Decor', 'Fashion'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      padding: {
        top: -22,
        bottom: -18
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        expandOnClick: false,
        donut: {
          size: '73%',
          labels: {
            show: true,
            name: {
              offsetY: 22,
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily
            },
            value: {
              offsetY: -17,
              fontWeight: 500,
              formatter: val => `${val}`,
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.h2.fontSize as string
            },
            total: {
              show: true,
              label: 'Total',
              color: theme.palette.text.secondary,
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.h5.fontSize as string,
              formatter: () => `${payload.totalOrders}`
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { width: 200, height: 249 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: { width: 150, height: 199 }
        }
      }
    ]
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
          <Box sx={{ gap: 1.75, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <Typography variant='h5' sx={{ mb: 0.5 }}>
                Órdenes abiertas
              </Typography>
              <Typography variant='body2'>Últimos 30 días</Typography>
            </div>
            <div>
              <Typography variant='h3'>${payload.totalAmount.toLocaleString()}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'success.main' } }}>
                <Icon icon='tabler:chevron-up' fontSize='1.25rem' />
                <Typography variant='h6' sx={{ color: 'success.main' }}>
                  {payload.percentChange}%
                </Typography>
              </Box>
            </div>
          </Box>
          <ReactApexcharts type='donut' width={150} height={165} series={series} options={options} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default EcommerceGeneratedLeads
