// ** MUI Imports
import { Box, Card, useTheme, Typography, CardHeader, CardContent }  from '@mui/material'
import Icon from 'src/@core/components/icon'
import { ApexOptions } from 'apexcharts'
import { useEffect, useState, useCallback } from 'react'
import { ThemeColor } from 'src/@core/layouts/types'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import UseBgColor from 'src/@core/hooks/useBgColor'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import apiConnector from 'src/services/api.service'

interface DataType {
  title: string
  amount: number
  subtitle: string
  avatarIcon: string
  trendNumber: number
  avatarColor: ThemeColor
  trend?: 'positive' | 'negative'
}

interface EarningReportsResponse {
  netProfit: {
    amount: number
    trendNumber: number
    salesCount: number
    trend: 'positive' | 'negative'
  }
  totalIncome: {
    amount: number
    trendNumber: number
    trend: 'positive' | 'negative'
  }
  totalExpenses: {
    amount: number
    trendNumber: number
    trend: 'positive' | 'negative'
  }
  weeklyData: number[]
}

const DashboardsEarningReports = () => {
  const theme = useTheme()
  const bgColors = UseBgColor()
  const [data, setData] = useState<DataType[]>([])
  const [weeklyData, setWeeklyData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])
  const [loading, setLoading] = useState(true)

  const fetchEarningReports = useCallback(async () => {
    setLoading(true)
    try {
      const response = await apiConnector.get<EarningReportsResponse>('/dashboards/earning-reports')

      const formattedData: DataType[] = [
        {
          amount: response.netProfit.amount,
          trendNumber: response.netProfit.trendNumber,
          title: 'Ganancia Neta',
          avatarColor: 'primary',
          subtitle: `${response.netProfit.salesCount.toLocaleString()} Ventas`,
          avatarIcon: 'tabler:chart-pie-2',
          trend: response.netProfit.trend
        },
        {
          amount: response.totalIncome.amount,
          trendNumber: response.totalIncome.trendNumber,
          title: 'Ingresos Totales',
          avatarColor: 'success',
          subtitle: 'Ventas, Comisiones',
          avatarIcon: 'tabler:currency-dollar',
          trend: response.totalIncome.trend
        },
        {
          amount: response.totalExpenses.amount,
          trendNumber: response.totalExpenses.trendNumber,
          title: 'Gastos Totales',
          avatarColor: 'secondary',
          subtitle: 'Publicidad, Marketing',
          avatarIcon: 'tabler:credit-card',
          trend: response.totalExpenses.trend
        }
      ]

      setData(formattedData)
      setWeeklyData(response.weeklyData)
    } catch (error) {
      console.error('Error fetching earning reports:', error)
      setData([])
      setWeeklyData([0, 0, 0, 0, 0, 0, 0])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchEarningReports()
  }, [fetchEarningReports])

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        columnWidth: '52%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    colors: [
      bgColors.primaryLight.backgroundColor,
      bgColors.primaryLight.backgroundColor,
      bgColors.primaryLight.backgroundColor,
      bgColors.primaryLight.backgroundColor,
      hexToRGBA(theme.palette.primary.main, 1),
      bgColors.primaryLight.backgroundColor,
      bgColors.primaryLight.backgroundColor
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      axisTicks: { show: false },
      axisBorder: { show: false },
      tickPlacement: 'on',
      labels: {
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize as string
        }
      }
    },
    yaxis: { show: false },
    grid: {
      show: false,
      padding: {
        left: -14,
        right: -16,
        bottom: -14
      }
    },
    responsive: [
      {
        breakpoint: 1300,
        options: {
          chart: { height: 260 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 213 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: {
            bar: { columnWidth: '40%' }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Reportes de Ganancias'
        subheader='Resumen Semanal de Ganancias'
        action={
          <OptionsMenu
            options={['Actualizar', 'Exportar', 'Compartir']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
          />
        }
      />
      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <Typography variant='body2'>Cargando datos...</Typography>
          </Box>
        ) : data.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              No hay datos disponibles
            </Typography>
          </Box>
        ) : (
          <>
            {data.map((item: DataType, index: number) => {
              return (
                <Box
                  key={item.title}
                  sx={{
                    display: 'flex',
                    '& img': { mr: 4 },
                    alignItems: 'center',
                    mb: index !== data.length - 1 ? 4 : undefined
                  }}
                >
                  <CustomAvatar
                    skin='light'
                    variant='rounded'
                    color={item.avatarColor}
                    sx={{ mr: 4, width: 34, height: 34 }}
                  >
                    <Icon icon={item.avatarIcon} />
                  </CustomAvatar>

                  <Box
                    sx={{
                      rowGap: 1,
                      columnGap: 4,
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant='h6'>{item.title}</Typography>
                      <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                        {item.subtitle}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ mr: 4 }} variant='body2'>
                        ${item.amount.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          '& svg': { mr: 1, color: item.trend === 'negative' ? 'error.main' : 'success.main' }
                        }}
                      >
                        <Icon
                          fontSize='1.25rem'
                          icon={item.trend === 'negative' ? 'tabler:chevron-down' : 'tabler:chevron-up'}
                        />
                        <Typography variant='body2' sx={{ color: 'text.disabled' }}>{`${item.trendNumber}%`}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )
            })}
            <ReactApexcharts type='bar' height={213} options={options} series={[{ data: weeklyData }]} />
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default DashboardsEarningReports
