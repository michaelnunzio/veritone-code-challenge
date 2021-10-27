import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ListItemData } from '../../constants/item-data'
import Buttons from '../Modal/ModalButtons';

interface ItemData {
    item: ListItemData
}
const DeleteItemModal:React.FC<ItemData> = (ItemData) => {

  const {item: { _id }} = ItemData;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} edge="end" aria-label="comments">
        <DeleteOutlineIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Item?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sre you want to delete this item? This can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClose} autoFocus>
            Delete
          </Button> */}
          <Buttons.ModalDeleteButton
          id={_id}/>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteItemModal;