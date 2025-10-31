import { useCallback, useEffect, useState } from "react";
import apiConnector from "src/services/api.service";
import { defaultDataList, IDataList } from "src/types/apps/listTypes";
import { columns } from "./components/list/DataConfig";
import { Box } from "@mui/system";
import { Button, Card, CardHeader, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { Icon } from "@iconify/react";
import FullTable from "src/components/table/FullTable";
import Link from "next/link";
import CreateOrderModal from "./components/list/CreateOrderModal";
import toast from "react-hot-toast";
import ConfirmDeleteDialog from "src/components/dialogs/ConfirmDeleteDialog";

const OrdersList = () => {
  const theme = useTheme();
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [orders, setOrders] = useState<IDataList>({...defaultDataList});
  const [selected, setSelected] = useState<any>();

  const get = useCallback(async() => {
    const result: any = await apiConnector.get('/orders', {pageSize: 10, page: 0});
    setOrders({...defaultDataList, data: result.data});
  }, [setOrders]);

  useEffect(() => { get(); }, [get]);


  const actions = (row: any) =>
  <>
    <Tooltip title='Ver Orden' arrow placement='top'>
      <IconButton LinkComponent={Link} href={`/tienda/orden-venta/detalle/${row.id}`}>
        <Icon icon='tabler:eye' />
      </IconButton>
    </Tooltip>
    <Tooltip title='Eliminar' arrow placeholder="top">
      <IconButton onClick={() => {
        setSelected(row);
        setOpenDelete(true);
      }}>
        <Icon icon='tabler:trash' color={theme.palette.error.main}/>
      </IconButton>
    </Tooltip>
  </>

  const cols = columns(actions)

  const onDelete = async() => {
    try {
      await apiConnector.remove(`/orders/${selected.id}`);
      setOpenDelete(false);
      toast.success('Se eliminó la orden de venta con éxito.')
      get();
    } catch (error) {
      toast.error('Ups! Ocurrió un error.')
    }
  }

  return <>
    <Box>

    </Box>
    <Grid>
      <Grid item lg={12} xs={12}>
        <Card>
          <CardHeader title='Ordenes de ventas' action={<>
            <Button
              variant="contained"
              startIcon={<Icon icon='tabler:plus' />}
              onClick={() => setOpenCreate(true)}
            >Nueva</Button>
          </>} />
          <FullTable
            data={orders}
            columns={cols}
            paginationModel={paginationModel}
            setPagination={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
    <CreateOrderModal open={openCreate} onClose={() => setOpenCreate(false)} refresh={get}/>
    {
      openDelete && <ConfirmDeleteDialog
      open={openDelete}
      onClose={() => setOpenDelete(false)}
      title={`Eliminar la orden de venta ${selected.id}`}
      titleAction="Eliminar orden de venta"
      action={onDelete}
      >
        <Typography fontSize={14}>¿Está seguro que desea elimina la orden de venta #<strong>{selected.id}</strong>?</Typography>
      </ConfirmDeleteDialog>
    }
  </>;
}

export default OrdersList
