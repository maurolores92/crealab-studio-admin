import { Box, Button, Card, CardHeader, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import FullTable from "src/components/table/FullTable"
import { defaultDataList, IDataList } from "src/types/apps/listTypes";
import { columns } from "./components/DataConfig";
import ModalCategory from "./components/ModalCategory";
import { Icon } from "@iconify/react";
import apiConnector from "src/services/api.service";
import ConfirmDeleteDialog from "src/components/dialogs/ConfirmDeleteDialog";
import toast from "react-hot-toast";


const CategoriesList = () => {
  const theme = useTheme();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [categories, setCategories] = useState<IDataList>({...defaultDataList});
  const [selected, setSelected] = useState<any>();

  const get = useCallback(async() => {
    const result: any = await apiConnector.get('/products/categories', paginationModel);

    setCategories(result);
  }, [setCategories, paginationModel]);

  useEffect(() => { get(); }, [get]);

  const actions = (row: any) => (
    <>
      <Tooltip title='Editar' arrow placement='top'>
        <IconButton onClick={() => {
          setSelected(row);
          setOpenCreate(true);
        }}><Icon icon='tabler:pencil' /></IconButton>
      </Tooltip>
      <Tooltip title='Eliminar' arrow placeholder="top">
        <IconButton
          onClick={() => {
            setSelected(row);
            setOpenDelete(true);
          }}
          disabled={row.count > 0}
        >
          <Icon icon='tabler:trash' color={row.count > 0 ? theme.palette.grey[400] : theme.palette.error.main} />
        </IconButton>
      </Tooltip>
    </>
  )
  const cols = columns(actions)


  const onDelete = async() => {
    try {
      await apiConnector.remove(`/products/categories/${selected.id}`);
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
          <CardHeader title='Categorias' action={<>
            <Button
              variant="contained"
              startIcon={<Icon icon='tabler:plus' />}
              onClick={() => setOpenCreate(true)}
            >Nueva</Button>
          </>} />
          <FullTable
            data={categories}
            columns={cols}
            paginationModel={paginationModel}
            setPagination={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
    {
      openCreate && <ModalCategory
      open={openCreate}
      onClose={() => setOpenCreate(false)}
      refresh={get}
      category={selected}
      />
    }
    {
      openDelete && <ConfirmDeleteDialog
      open={openDelete}
      onClose={() => setOpenDelete(false)}
      title={`Eliminar la categoría ${selected.name}`}
      titleAction="Eliminar categoría"
      action={onDelete}
      >
        <Typography fontSize={14}>¿Está seguro que desea eliminar la categoría <strong>{selected.name}</strong>?</Typography>
      </ConfirmDeleteDialog>
    }
  </>
}

export default CategoriesList
