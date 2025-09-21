import FullTable from "src/components/table/FullTable";
import { useState } from "react";
import { defaultDataList } from "src/types/apps/listTypes";
import { Card, CardHeader } from "@mui/material";
import { columnsItems } from "./DataConfig";

const SalesItemsList = ({items}: any) => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  const cols = columnsItems()

  return <>
  <Card sx={{mb: 2}}>
    <CardHeader title='Productos' />
    <FullTable
      data={{...defaultDataList, data: items}}
      columns={cols}
      paginationModel={paginationModel}
      setPaginationModel={setPaginationModel}
    />
  </Card>
  </>;
}

export default SalesItemsList
