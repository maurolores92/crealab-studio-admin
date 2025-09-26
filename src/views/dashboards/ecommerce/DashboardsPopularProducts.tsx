
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState, useCallback } from 'react'
import OptionsMenu from 'src/@core/components/option-menu'
import apiConnector from 'src/services/api.service'

interface PopularProduct {
  id: number
  name: string
  code: string
  price: number
  totalSold: number
  totalRevenue: number
  image?: string
}

interface PopularProductsResponse {
  products: PopularProduct[]
  totalVisitors: number
}

const DashboardsPopularProducts = () => {
  const [products, setProducts] = useState<PopularProduct[]>([])
  const [totalVisitors, setTotalVisitors] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchPopularProducts = useCallback(async () => {
    setLoading(true)
    try {
      const response = await apiConnector.get<PopularProductsResponse>('/dashboards/popular-products')
      setProducts(response.products)
      setTotalVisitors(response.totalVisitors)
    } catch (error) {
      console.error('Error fetching popular products:', error)
      setProducts([])
      setTotalVisitors(0)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPopularProducts()
  }, [fetchPopularProducts])

  return (
    <Card>
      <CardHeader
        title='Productos Populares'
        subheader={`Total ${totalVisitors.toLocaleString()} ventas`}
        action={
          <OptionsMenu
            iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
            options={['Actualizar', 'Más vendidos', 'Mayor precio']}
          />
        }
      />
      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <Typography variant='body2'>Cargando productos...</Typography>
          </Box>
        ) : products.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              No hay productos disponibles
            </Typography>
          </Box>
        ) : (
          products.map((product: PopularProduct, index: number) => {
            return (
              <Box
                key={product.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: index !== products.length - 1 ? 4.75 : undefined
                }}
              >
                <Box
                  sx={{
                    mr: 4,
                    width: 46,
                    height: 46,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'action.hover',
                    borderRadius: 1
                  }}
                >
                  {product.image ? (
                    <img
                      width={46}
                      height={46}
                      src={product.image}
                      alt={product.name}
                      style={{ borderRadius: 4, objectFit: 'cover' }}
                    />
                  ) : (
                    <Typography variant='h6' sx={{ color: 'text.disabled' }}>
                      {product.name.charAt(0)}
                    </Typography>
                  )}
                </Box>

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
                    <Typography variant='h6'>{product.name}</Typography>
                    <Typography variant='body2' sx={{ fontWeight: 500, color: 'text.disabled' }}>
                      Código: {product.code} • {product.totalSold} vendidos
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      ${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </Typography>
                    <Typography variant='body2' sx={{ color: 'success.main', fontSize: '0.75rem' }}>
                      ${product.totalRevenue.toLocaleString('es-AR')} total
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}

export default DashboardsPopularProducts
