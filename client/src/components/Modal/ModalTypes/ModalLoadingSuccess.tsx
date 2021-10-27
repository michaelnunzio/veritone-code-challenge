import React from 'react';
import { LoadingIcon } from '../../Loading/LoadingIcon';
import { Grid, makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
    innerContainer: {
        padding: '30px 0'
    }
  }));

export const ModalLoading = () => {
    return (
        <LoadingIcon/>
    )
}

export const ModalSuccess = (props) => {
    const classes = useStyles();
    const { type } = props;
    return (
        <Grid container className={classes.innerContainer}>
            <Typography>
               Item Succesfully {type}
            </Typography>
        </Grid>
    )
}
