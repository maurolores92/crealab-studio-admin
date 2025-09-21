// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

import { useAuth } from 'src/hooks/useAuth'

const useVerticalNavigation = (): VerticalNavItemsType => {
  const { user } = useAuth()
  const isSuperAdmin = user?.role?.slug === 'super-admin'

  return [
    {
      icon: 'tabler:users',
      title: 'Clientes',
      path: '/clientes',
    },
    {
      icon: 'tabler:basket',
      title: 'Productos',
      children: [
        {
          icon: 'carbon:product',
          title: 'Listado',
          path: '/productos',
        },
        {
          icon: 'material-symbols:category',
          title: 'Categorías',
          path: '/categorias'
        },
      ]
    },
    {
      icon: 'icon-park-outline:sales-report',
      title: 'Orden de venta',
      path: '/tienda/orden-venta/'
    },
    {
      icon: 'vaadin:stock',
      title: 'Inventario',
      path: '/inventario'
    },
    {
      icon: 'tabler:basket',
      title: 'Administracion',
      children: [
        {
          icon: 'carbon:sales-ops',
          title: 'Venta',
          path: '/ventas/'
        },
        {
          icon: 'arcticons:expense-register',
          title: 'Gastos',
          path: '/gastos'
        },
        {
          icon: 'material-symbols:category',
          title: 'Retiros',
          path: '/retiros'
        },
      ]
    },
    ...(isSuperAdmin ? [
      {
        icon: 'tabler:users',
        title: 'Usuarios',
        path: '/usuarios'
      }
    ] : []),
  ]
}

export default useVerticalNavigation
