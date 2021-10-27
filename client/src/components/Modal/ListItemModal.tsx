import React, {Dispatch} from 'react';
import Typography from '@mui/material/Typography';
import { Grid, makeStyles, Button, Backdrop, Modal, Fade, Box } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Modals from '../Modal/ModalTypes/ModalTypes';
import Buttons from '../Modal/ModalButtons';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { IAction, SetLoadingState} from "../../actions";
import { IAppState } from '../../store';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    dialogContainer: {

    },
    dialogHeader: {
        backgroundColor: '#fafafa',
        minWidth: '60vw',
    }
  }));

  interface IProps {
    setModalLoadingState(x): any;
    modalLoading?: number;
    type: any;
    item?: any;
  }

const TransitionsModal: React.FC<IProps> = ({ type, item, modalLoading, setModalLoadingState }) => {
    const classes = useStyles();
    // const { type, item } = props;

    //Dialog Section
        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
            setTimeout(() => {
              setModalLoadingState(0);
            }, 1000)
        };
    //Dialog Section

    const returnCorrectBtn = (type) => {
      switch(type) {
        case 'edit':
          return (
          <IconButton edge="end" aria-label="comments" onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
          )
        case 'addItem':
          return (
            <Button onClick={handleClickOpen}>Add Item</Button>
          )
        case 'addNew':
          return (
            <Button onClick={handleClickOpen}>Add Your First Item</Button>
          )
      }
    }
  
  return (
    <>
    {returnCorrectBtn(type)}
    <Dialog className={classes.dialogContainer} open={open} onClose={handleClose}>
    <DialogTitle className={classes.dialogHeader}>SHOPPING LIST</DialogTitle>
    <DialogContent>
        { type === 'edit' ?
            <Modals.ModalEditItems
            componentProps={item}/>
        : <Modals.ModalAddItems/>}
    </DialogContent>
    <DialogActions>
      { modalLoading === 0 ?
      <>
          <Button onClick={handleClose}>Cancel</Button>
          {type === 'edit' ?
            <Buttons.ModalUpdateButton/>
          : 
          <Buttons.ModalAddButton/> }
        </>
      : <Button onClick={handleClose}>Close</Button>}
    </DialogActions>
  </Dialog>
  </>
  );
}

const mapStateToProps = (state: IAppState) => {
  return {
      modalLoading: state.app.modalLoading
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    setModalLoadingState: (x) => dispatch(SetLoadingState(x))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransitionsModal);