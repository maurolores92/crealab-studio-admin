// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useAuth } from 'src/hooks/useAuth'
import { useEffect, useState, useCallback } from 'react'
import apiConnector from 'src/services/api.service'

const Illustration = styled('img')(({ theme }) => ({
  right: 20,
  bottom: 0,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    right: 5,
    width: 110
  }
}))

const DashboardsWelcomeCard = () => {
  const { user } = useAuth();
  const [totalSpent, setTotalSpent] = useState<number | null>(null);

  const fetchTotalSpent = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await apiConnector.get<{ total: number }>(`/expenses/total-by-user/${user.id}`);
      setTotalSpent(res.total);
    } catch (err) {
      setTotalSpent(null);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchTotalSpent();
  }, [fetchTotalSpent]);

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h5' sx={{ mb: 0.5 }}>
          Bienvenido {user?.name} {user?.lastName}!
        </Typography>
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>Total gastado por vos:</Typography>
        <Typography variant='h4' sx={{ mb: 0.75, color: 'primary.main' }}>
          {totalSpent !== null ? `$${totalSpent.toLocaleString('es-AR', { minimumFractionDigits: 2 })}` : 'Cargando...'}
        </Typography>
        <Button variant='contained' href='/gastos'>Ver gastos</Button>
        <Illustration width={116} alt='congratulations john' src='/images/cards/congratulations-john.png' />
      </CardContent>
    </Card>
  )
}

export default DashboardsWelcomeCard
