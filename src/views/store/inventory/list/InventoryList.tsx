import {  Button, Card, CardHeader, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import FullTable from "src/components/table/FullTable"
import { defaultDataList, IDataList } from "src/types/apps/listTypes";
import { Icon } from "@iconify/react";
import apiConnector from "src/services/api.service";
import ConfirmDeleteDialog from "src/components/dialogs/ConfirmDeleteDialog";
import toast from "react-hot-toast";
import Link from "next/link";
import InventoryFilters from "./components/InventoryFilters";
import { columns } from "./components/DataConfig";
import ModalInventory from "./components/ModalInventory";


const InventoryList = () => {
  const theme = useTheme();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [inventory, setInventory] = useState<IDataList>({...defaultDataList});
  const [selected, setSelected] = useState<any>();
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const get = useCallback(async(filters={}) => {
    const result: any = await apiConnector.get('/inventory', {...paginationModel, ...filters});
    setInventory(result);
  }, [setInventory, paginationModel]);

  useEffect(() => { get(); }, [get]);

  const actions = (row: any) => (
    <>
      <Tooltip title='Ver inventario' arrow placement='top'>
        <IconButton LinkComponent={Link} href={`/inventario/detalle/${row.id}`}>
          <Icon icon='tabler:eye' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Editar' arrow placement='top'>
        <IconButton onClick={() => {
          setSelected(row);
          setOpenCreate(true);
        }}><Icon icon='tabler:pencil' /></IconButton>
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

  const setPagination = (model: any) => {
    setPaginationModel(model);
  }


  const onDelete = async() => {
    try {
      await apiConnector.remove(`/inventory/${selected.id}`);
      setOpenDelete(false);
      toast.success('Se eliminó el inventario con éxito.')
      get();
    } catch (error) {
      toast.error('Ups! Ocurrió un error.')
    }
  }

  return <>
    <Grid container spacing={2}>
      <Grid item lg={12} xs={12}>
        <Card>
          <CardHeader title='Inventario' action={<>
            <Button
              variant="contained"
              startIcon={<Icon icon='tabler:plus' />}
              onClick={() => setOpenCreate(true)}
            >
              Nueva
            </Button>
          </>} />
          <InventoryFilters apply={get}/>
          <FullTable
            data={inventory}
            columns={cols}
            paginationModel={paginationModel}
            setPagination={setPagination}
          />
        </Card>
      </Grid>
    </Grid>
    {
      openCreate &&
      <ModalInventory
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        refresh={get}
        inventory={selected}
        setSelected={setSelected}
      />
      }
    {
      openDelete && <ConfirmDeleteDialog
      open={openDelete}
      onClose={() => setOpenDelete(false)}
      title={`Eliminar el inventario ${selected.name}`}
      titleAction="Eliminar inventario"
        client={selected}
        setSelected={setSelected}
      />
      }
    {
      openDelete && <ConfirmDeleteDialog
      open={openDelete}
      onClose={() => setOpenDelete(false)}
      title={`Eliminar el inventario ${selected.name}`}
      titleAction="Eliminar inventario"
      action={onDelete}
      >
        <Typography fontSize={14}>¿Está seguro que desea eliminar el inventario <strong>{selected.name}</strong>?</Typography>
      </ConfirmDeleteDialog>
    }
  </>
}

export default InventoryList
