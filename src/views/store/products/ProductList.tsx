import {  Button, Card, CardHeader, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import FullTable from "src/components/table/FullTable"
import { defaultDataList, IDataList } from "src/types/apps/listTypes";
import { columns } from "./components/DataConfig";
import { Icon } from "@iconify/react";
import apiConnector from "src/services/api.service";
import ConfirmDeleteDialog from "src/components/dialogs/ConfirmDeleteDialog";
import toast from "react-hot-toast";
import Link from "next/link";
import ProductFilters from "./components/list/ProductFilters";


const ProductList = () => {
  const theme = useTheme();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const [products, setProducts] = useState<IDataList>({...defaultDataList});
  const [selected, setSelected] = useState<any>();

  const get = useCallback(async(filters={}) => {
    const result: any = await apiConnector.get('/products', {...paginationModel, ...filters});
    setProducts(result);
  }, [setProducts, paginationModel]);

  useEffect(() => { get(); }, [get]);

  const actions = (row: any) => (
    <>
      <Tooltip title='Ver producto' arrow placement='top'>
        <IconButton LinkComponent={Link} href={`/productos/detalle/${row.id}`}>
          <Icon icon='tabler:eye' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Editar' arrow placement='top'>
        <IconButton href={`/productos/editar/${row.id}`} LinkComponent={Link}>
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

  const setPagination = (model: any) => {
    setPaginationModel(model);
  }


  const onDelete = async() => {
    try {
      await apiConnector.remove(`/products/${selected.id}`);
      setOpenDelete(false);
      toast.success('Se eliminó el producto con éxito.')
      get();
    } catch (error) {
      toast.error('Ups! Ocurrió un error.')
    }
  }

  return <>
    <Grid container spacing={2}>
      <Grid item lg={12} xs={12}>
        <Card>
          <CardHeader title='Productos' action={<>

            <Button
              variant="contained"
              startIcon={<Icon icon='tabler:plus' />}
              LinkComponent={Link}
              href="/productos/nuevo/"
            >Nuevo</Button>
          </>} />
          <ProductFilters apply={get}/>
          <FullTable
            data={products}
            columns={cols}
            paginationModel={paginationModel}
            setPagination={setPagination}
          />
        </Card>
      </Grid>
    </Grid>

    {
      openDelete && <ConfirmDeleteDialog
      open={openDelete}
      onClose={() => setOpenDelete(false)}
      title={`Eliminar la producto ${selected.name}`}
      titleAction="Eliminar producto"
      action={onDelete}
      >
        <Typography fontSize={14}>¿Está seguro que desea eliminar el producto <strong>{selected.name}</strong>?</Typography>
      </ConfirmDeleteDialog>
    }
  </>
}

export default ProductList
