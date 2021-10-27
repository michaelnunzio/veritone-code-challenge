import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, makeStyles, Button, Backdrop, Modal, Fade, Box } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ModalEditItems } from '../Modal/ModalTypes/ModalTypes';
import { ModalUpdateButton } from '../Modal/ModalButtons';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

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
    const { type, item } = props;

    //Dialog Section
        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };
    //Dialog Section
  
  return (
    <>
    <IconButton edge="end" aria-label="comments">
        <EditIcon onClick={handleClickOpen} />
    </IconButton>

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
  </>
  );
}

export default TransitionsModal;