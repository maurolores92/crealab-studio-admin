import { Box, Button, Card, CardHeader, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import FullTable from "src/components/table/FullTable"
import { defaultDataList, IDataList } from "src/types/apps/listTypes";
import { columns } from "./components/DataConfig";
import ModalProvider from "./components/ModalProvider";
import { Icon } from "@iconify/react";
import apiConnector from "src/services/api.service";
import ConfirmDeleteDialog from "src/components/dialogs/ConfirmDeleteDialog";
import toast from "react-hot-toast";
import Link from "next/link";


const ProviderList = () => {
  const theme = useTheme();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  const [providers, setProviders] = useState<IDataList>({...defaultDataList});
  const [selected, setSelected] = useState<any>();

  const get = useCallback(async() => {
    const result: any = await apiConnector.get('/provider', {pageSize: 10, page: 0});
    
    setProviders({...defaultDataList, data: result.data});
  }, [setProviders]);

  useEffect(() => { get(); }, [get]);
  
  const actions = (row: any) => (
    <>
      <Tooltip title='Editar' arrow placement='top'>
        <IconButton href={`/proveedores/editar/${row.id}`} LinkComponent={Link}>
          <Icon icon='tabler:pencil' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Eliminar' arrow placeholder="top">
        <IconButton onClick={() => {
          setSelected(row);
          setOpenDelete(true);
        }} >
          <Icon icon='tabler:trash' color={theme.palette.error.main}/>
        </IconButton>
      </Tooltip>
    </>
  )
  const cols = columns(actions)


  const onDelete = async() => {
    try {
      await apiConnector.remove(`/provider/${selected.id}`);
      setOpenDelete(false);
      toast.success('Se eliminó la columna con éxito.')
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
          <CardHeader title='Proveedores' action={<>
            <Button 
              variant="contained" 
              startIcon={<Icon icon='tabler:plus' />} 
              onClick={() => setOpenCreate(true)}
            >Nuevo</Button>
          </>} />
          <FullTable
            data={providers}
            columns={cols}
            paginationModel={paginationModel}
            setPagination={setPaginationModel}

          />
        </Card>
      </Grid>
    </Grid>
    {
      openCreate && <ModalProvider 
      open={openCreate} 
      onClose={() => setOpenCreate(false)} 
      refresh={get}
      provider={selected}
      />
    }
    {
      openDelete && <ConfirmDeleteDialog 
      open={openDelete} 
      onClose={() => setOpenDelete(false)} 
      title={`Eliminar la proveedor ${selected.name}`}
      titleAction="Eliminar proveedor"
      action={onDelete}
      >
        <Typography fontSize={14}>¿Está seguro que desea eliminar el proveedor <strong>{selected.name}</strong>?</Typography>
      </ConfirmDeleteDialog>
    }
  </>
}

export default ProviderList