import { Box, Button, Card, CardHeader, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import FullTable from "src/components/table/FullTable"
import apiConnector from "src/services/api.service";
import { defaultDataList, IDataList } from "src/types/apps/listTypes";
import { columns } from "./components/DataConfig";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import ConfirmDeleteDialog from "src/components/dialogs/ConfirmDeleteDialog";
import ModalBrand from "./components/ModalBrand";

const BrandsList = () => {
  const theme = useTheme();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });
  const [selected, setSelected] = useState<any>();
  const [brands, setBrands] = useState<IDataList>({...defaultDataList});


  const get = useCallback(async() => {
    const result: any = await apiConnector.get('/brand', paginationModel);
    setBrands(result);
  }, [setBrands, paginationModel]);

  
  useEffect(() => {
    get();
  }, [get]);

  const actions = (row: any) => (
    <>
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
        }}>
          <Icon icon='tabler:trash' color={theme.palette.error.main}/>
        </IconButton>
      </Tooltip>
    </>
  )
  const cols = columns(actions)


  const onDelete = async() => {
    try {
      await apiConnector.remove(`/brand/${selected.id}`);
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
          <CardHeader title='Marcas' action={<>
            <Button
              variant="contained"
              startIcon={<Icon icon='tabler:plus' />}
              onClick={() => setOpenCreate(true)}
            >Nueva</Button>
          </>} />
          <FullTable
            data={brands}
            columns={cols}
            paginationModel={paginationModel}
            setPagination={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
    {
      openCreate && <ModalBrand
      open={openCreate}
      onClose={() => setOpenCreate(false)}
      refresh={get}
      brand={selected}
      setSelected={setSelected}
      />
    }
    {
      openDelete && <ConfirmDeleteDialog
      open={openDelete}
      onClose={() => setOpenDelete(false)}
      title={`Eliminar la marca ${selected.name}`}
      titleAction="Eliminar marca"
      action={onDelete}
      >
        <Typography fontSize={14}>¿Está seguro que desea eliminar la marca <strong>{selected.name}</strong>?</Typography>
      </ConfirmDeleteDialog>
    }
  </>
}

export default BrandsList
