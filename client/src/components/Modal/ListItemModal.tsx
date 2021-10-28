import React, {Dispatch} from 'react';
import { makeStyles, Button } from '@material-ui/core';
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
    addBtn: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      textTransform: 'none',
      margin: '10px 0',
      padding: '6px 17px',
      fontSize: '16px',
      fontWeight: 600,
      "&:hover": {
          backgroundColor: '#3C6792 !important'
        },
    },
    dialogHeader: {
        backgroundColor: '#fafafa',
        minWidth: '60vw',
        fontFamily: 'Dosis !important',
        marginBottom: '25px !important',
        borderBottom: 'solid .5px #D5DFE9'
    },
    dialogHeaderTxt: {
      fontSize: '17px',
      fontWeight: 800,
      color: '#5C6269'
    },
    cancelBtn: {
      textTransform: 'none',
      padding: '8px 17px',
      fontSize: '16px',
      fontWeight: 600,
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

    //Dialog Section
        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
            setTimeout(() => {
              setModalLoadingState(0);
            }, 100)
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
            <Button className={classes.addBtn} onClick={handleClickOpen}>Add Item</Button>
          )
        case 'addNew':
          return (
            <Button className={classes.addBtn} onClick={handleClickOpen}>Add Your First Item</Button>
          )
      }
    }
  
  return (
    <>
    {returnCorrectBtn(type)}
    <Dialog className={classes.dialogContainer} open={open} onClose={handleClose}>
    <DialogTitle className={classes.dialogHeader}>
      <div className={classes.dialogHeaderTxt}>SHOPPING LIST</div>
    </DialogTitle>
    <DialogContent>
        { type === 'edit' ?
            <Modals.ModalEditItems
            componentProps={item}/>
        : <Modals.ModalAddItems/>}
    </DialogContent>
    <DialogActions>
      { modalLoading === 0 ?
      <>
          <Button className={classes.cancelBtn} onClick={handleClose}>Cancel</Button>
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