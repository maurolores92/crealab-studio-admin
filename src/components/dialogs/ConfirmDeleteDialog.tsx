import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

import { Icon } from '@iconify/react'

const ConfirmDeleteDialog = ({open, onClose, title, children, action, titleAction='Eliminar', loading=false}: any) => {

  return (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth={'sm'}>
      <DialogTitle id='form-dialog-title'>
        <Typography fontSize={18} fontWeight={600}>{title}</Typography>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
          <Button onClick={onClose} color="error">Cancelar</Button>
          <Button
            variant="contained"
            color="error"
            onClick={action}
            startIcon={loading ? <Icon icon='eos-icons:loading' /> : <></>}
          >
            {titleAction}
          </Button>
      </DialogActions>
  </Dialog>
  );
}

export default ConfirmDeleteDialog;
