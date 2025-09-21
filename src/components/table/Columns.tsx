import { Link, Typography, Box, Avatar } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { DateTime } from 'luxon';
import CustomChip from 'src/@core/components/mui/chip';
import StatusChip from './StatusChip';

export const TitleColumn = (field: any, color = 'primary.main') => <Typography sx={{ color }}>{field}</Typography>

export const price = (price: any, currency = '$', color= 'primary.main') => TitleColumn(`${currency} ${price}`, color);

export const EmailAndPhoneColumn = (params: GridRenderCellParams) => {
  return (
    <>
      <Box>
        <Link href={`mailto:${params.row.email}`} style={{ color: 'info.main', textDecoration: 'none' }}>
          {params.row.email}
        </Link>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.phone}
        </Typography>
      </Box>
    </>
  )
}

export const TitleTwo = (value: any , value2: any  ) => {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography noWrap variant='body2' sx={{ color: 'primary.main'}}>
          {value}
        </Typography>
        <Typography noWrap variant='body2' sx={{ color: 'primary.main'}}>
          {value2}
        </Typography>
      </Box>
    </Box>
  )
}

export const TitleAndSubtitle = (title: any , subtitle: any, subtitle2?: any, image?: string) => {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
      {
        image ?
        <Avatar sx={{mr: 3}} variant='rounded' src={image} alt='image' />
        : <></>
      }
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ color: 'primary.main', fontSize: 14, fontWeight: 600}}>
          {title}
        </Typography>
        <Typography variant='body2' sx={{ color: 'grey'}}>
          {subtitle}
        </Typography>
        {
          subtitle2 ? <Typography variant='body2' sx={{ color: 'grey'}}>
          {subtitle2}
        </Typography>: <></>
        }
      </Box>
    </Box>
  )
}

export const titleTwoColumns = (params :any, field: any , field2: any  ) => {
  const { row } = params

  return TitleTwo(row[field], row[field2])
}
export const labelColumn = (data: any, color: any ='primary') => (<CustomChip label={data} skin='light' color={color} />)

export const labelColumnStatusBoolean = (status: boolean) => {
  return <StatusChip isActive={status} />;
};

export const labelColumnReadStatus = (status: boolean) => {
  return <StatusChip isActive={status} activeLabel="Leido" inactiveLabel="No Leido" activeColor="success" inactiveColor="warning" />;
};

export const dateTimeColumn = (params: GridRenderCellParams, field = 'createdAt') => {
  const date = DateTime.fromISO(params.row[field]).toFormat('dd-MM-yyyy');
  const time = DateTime.fromISO(params.row[field]).toFormat('hh:mm a');

return (
  <Box sx={{textAlign: 'right'}}>
    <Typography variant='body2' sx={{ color: 'text.primary'}}>{date}</Typography>
    <Typography variant='body2' sx={{ color: 'text.primary'}}>{time}</Typography>
  </Box>
);
};


export const dateColumn = (field = 'createdAt', minWidth= 100) => ({
  flex: 0.170,
  minWidth,
  headerName: 'Creado',
  field,
  align: 'right',
  headerAlign: 'right',
  valueGetter: (params: any) => new Date(params.value),
  renderCell: (params: GridRenderCellParams) => dateTimeColumn(params, field)
});


export const actionsColumn = (actions: any, minWidth = 180): any => ({
  flex: 0.1,
  minWidth,
  headerName: 'Acciones',
  field: 'action',
  align: 'right',
  headerAlign: 'right',
  renderCell: (params: GridRenderCellParams) => {
    const render = actions(params.row)

    return <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>{render}</Box>
  }
})

export const colorCircleColumn = (params: GridRenderCellParams) => {
  const hex = params.row.color;
  if (!hex) {
    return <Typography variant='body2'>-</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        bgcolor: hex,
        border: '1px solid #ccc',
        mr: 1
      }} />
      <Typography variant='body2'>{hex}</Typography>
    </Box>
  );
};


