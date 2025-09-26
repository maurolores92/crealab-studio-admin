import { Fragment, useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Icon from 'src/@core/components/icon'
import OptionsMenu from 'src/@core/components/option-menu'
import apiConnector from 'src/services/api.service'
import { DateTime } from 'luxon'

const Timeline = styled(MuiTimeline)<TimelineProps>({
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  },
  '& .MuiTimelineDot-root': {
    border: 0,
    padding: 0
  }
})

interface PaidOrderData {
  id: number
  orderNumber: string
  clientName: string
  clientEmail: string
  totalAmount: number
  paidDate: string
  changedBy: string
}

const DashboardsOrders = () => {
  const [paidOrders, setPaidOrders] = useState<PaidOrderData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchRecentPaidOrders = async () => {
    try {
      setLoading(true)
      const response = await apiConnector.get('/dashboards/recent-paid-orders?limit=5')
      setPaidOrders(response as PaidOrderData[])
    } catch (error) {
      setPaidOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecentPaidOrders()
  }, [])

  const formatDate = (dateString: string) => {
    const today = DateTime.now().toFormat('yyyy-MM-dd')
    const date = DateTime.fromISO(dateString).toFormat('yyyy-MM-dd')
    if (today === date) {
      return DateTime.fromISO(dateString).toFormat('HH:mm')
    }

    return DateTime.fromISO(dateString).toFormat('dd/MM/yyyy')
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader
        sx={{ pb: 4 }}
        title='Órdenes Pagadas'
        subheader='Órdenes recientemente marcadas como pagadas'
        action={
          <OptionsMenu
            options={['Ver todas las órdenes', 'Actualizar']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
          />
        }
      />
      <Box sx={{ px: 3, pb: 3 }}>
        {loading ? (
          <Box>
            {[...Array(3)].map((_, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Skeleton variant='circular' width={24} height={24} sx={{ mb: 1 }} />
                <Skeleton variant='text' width='80%' height={20} />
                <Skeleton variant='text' width='60%' height={16} />
              </Box>
            ))}
          </Box>
        ) : paidOrders.length > 0 ? (
          <Timeline>
            {paidOrders.map((order, index) => (
              <Fragment key={order.id}>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color='success' variant='outlined' sx={{ mt: 0 }}>
                      <Icon fontSize='1.25rem' icon='tabler:check' />
                    </TimelineDot>
                    {index !== paidOrders.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent sx={{ mt: 0, pt: 0, pb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography
                        variant='body2'
                        sx={{
                          fontWeight: 600,
                          color: 'success.main',
                          textTransform: 'uppercase'
                        }}
                      >
                        {order.orderNumber}
                      </Typography>
                      <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                        {formatDate(order.paidDate)}
                      </Typography>
                    </Box>
                    <Typography sx={{ mb: 0.5, fontWeight: 500 }} variant='h6'>
                      {order.clientName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontWeight: 500, color: 'success.main' }}>
                        {formatAmount(order.totalAmount)}
                      </Typography>
                      <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                        por {order.changedBy}
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              </Fragment>
            ))}
          </Timeline>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Icon fontSize='3rem' icon='tabler:receipt-off' style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              No hay órdenes pagadas recientes
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  )
}

export default DashboardsOrders
