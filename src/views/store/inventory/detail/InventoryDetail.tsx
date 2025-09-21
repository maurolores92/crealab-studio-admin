import { Button, Grid} from "@mui/material"
import ModalInventory from "../list/components/ModalInventory";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react"
import apiConnector from "src/services/api.service";
import HistoryCard from "src/components/cards/HistoryCard";
import { Icon } from "@iconify/react";
import MainHeader from "src/components/boxes/MainHeader";
import BasicInfoCard from "./components/BasicInfoCard";

const InventoryDetail = () => {
  const [inventory, setInventory] = useState<any>();
  const [history, setHistory] = useState<any[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const router = useRouter();
  const {id} = router.query;

  const get = useCallback(async() => {
    try {
      const result: any = await apiConnector.get(`/inventory/${id}`);
      setInventory(result.data);
      if (id) {
        const historyRes: any = await apiConnector.get(`inventory/history/${id}`);
        setHistory(historyRes);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  useEffect(() => {get();}, [get])

  return inventory ? <>

    <Grid container spacing={2}>
      <MainHeader title={inventory.name} type='Inventario' actions={<Button
          variant="contained"
          startIcon={<Icon icon={'tabler:pencil'} />}
          onClick={() => setOpenEdit(true)}>
            Editar
          </Button>}
      >
      </MainHeader>
      <Grid item lg={12} xs={12}>
        <BasicInfoCard inventory={inventory} refresh={get}/>
      </Grid>
      <Grid item lg={5} xs={12}>
        <HistoryCard history={history} />
      </Grid>
    </Grid>
    {openEdit && (
      <ModalInventory
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        refresh={get}
        inventory={inventory}
      />
    )}
    </>
  : <></>
}

export default InventoryDetail
