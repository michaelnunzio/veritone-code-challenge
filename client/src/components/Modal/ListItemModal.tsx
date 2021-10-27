import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, makeStyles, Button, Backdrop, Modal, Fade, Box } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ModalEditItems } from '../Modal/ModalTypes/ModalTypes';
import { ModalUpdateButton } from '../Modal/ModalButtons';

const useStyles = makeStyles((theme) => ({
    dialogContainer: {

    },
    dialogHeader: {
        backgroundColor: '#fafafa',
        minWidth: '60vw',

    }
  }));

const TransitionsModal = (props) => {
    const classes = useStyles();
    const {open, handleClose, 
        type,
        item
    } = props;
  return (
    <Dialog className={classes.dialogContainer} open={open} onClose={handleClose}>
    <DialogTitle className={classes.dialogHeader}>SHOPPING LIST</DialogTitle>
    <DialogContent>
        { type === 'edit' ?
            <ModalEditItems
            item={item}/>
        : null}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <ModalUpdateButton
      id={item?._id}/>
    </DialogActions>
  </Dialog>
  );
}

export default TransitionsModal;