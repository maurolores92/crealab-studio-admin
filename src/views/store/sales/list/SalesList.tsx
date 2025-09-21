import { useCallback, useEffect, useState } from "react";
import apiConnector from "src/services/api.service";
import { defaultDataList, IDataList } from "src/types/apps/listTypes";
import { Box } from "@mui/system";
import {  Card, CardHeader, Grid, IconButton, Tooltip } from "@mui/material";
import { Icon } from "@iconify/react";
import FullTable from "src/components/table/FullTable";
import Link from "next/link";
import { columns } from "./components/DataConfig";

const SalesList = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });
  const [orders, setOrders] = useState<IDataList>({...defaultDataList});

  const get = useCallback(async() => {
    const result: any = await apiConnector.get('/orders/paid', {pageSize: 10, page: 0});
    setOrders({...defaultDataList, data: result.data});
  }, [setOrders]);

  useEffect(() => { get(); }, [get]);


  const actions = (row: any) =>
  <>
    <Tooltip title='Ver Orden' arrow placement='top'>
      <IconButton LinkComponent={Link} href={`/ventas/detalle/${row.id}`}>
        <Icon icon='tabler:eye' />
      </IconButton>
    </Tooltip>
  </>

  const cols = columns(actions)

  return <>
    <Box>

    </Box>
    <Grid>
      <Grid item lg={12} xs={12}>
        <Card>
          <CardHeader title='Ventas' action={<>
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
  </>;
}

export default SalesList
