import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width:"100%"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn:{
      textTransform:"capitalize",
      fontSize:"20px",
      marginRight:"50px",
      padding:"5px"
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{width:"100%"}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <Button color="inherit" className={classes.btn}><Link to="/home" style={{color:"white",textDecoration:"none"}}>Covid-19</Link></Button>
          </Typography>
          <Button color="inherit" className={classes.btn}><Link to="/stats" style={{color:"white",textDecoration:"none"}}>Stats</Link></Button>
          <Button color="inherit" className={classes.btn} href="#prevention">Prevention</Button>
          <Button color="inherit" className={classes.btn}>About Us</Button>
        </Toolbar>
      </AppBar>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
