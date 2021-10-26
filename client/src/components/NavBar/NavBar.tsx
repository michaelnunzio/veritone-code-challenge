import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    navBar: {
        'backgroundColor': theme.palette.primary.main
    }
}));

const NavBar = () => {
    const classes = useStyles();
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className={classes.navBar}>
            <Toolbar>
            <Typography variant="h6" component="div">
                SHOPPING LIST
            </Typography>
            </Toolbar>
        </AppBar>
        </Box>
    );
}

export default NavBar;