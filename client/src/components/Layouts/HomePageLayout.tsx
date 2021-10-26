import React from 'react';
import { Grid, makeStyles } from "@material-ui/core";

interface ParentCompProps {
    childComp?: React.ReactNode;
  }  

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        // backgroundColor: 'pink',
        padding: '75px 0',
        textAlign: 'center',
        justifyContent: 'center',
    }
}));

const HomePageLayout: React.FC<ParentCompProps> = (props) => {
    const classes = useStyles();
    const { childComp } = props;

  return (
    <Grid container className={classes.container}>
        {childComp}
    </Grid>
  );
}

export default HomePageLayout;
