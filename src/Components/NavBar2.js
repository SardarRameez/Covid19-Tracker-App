import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  appBar: {
    width:"100%",
    margin:"0",
    padding:"0px"
  },
  list: {
    width: 200,
    height:"100%",
    backgroundColor:"#000080"
  },
  fullList: {
    width: 'auto',
  },
});

export default function NavBar2() {
  const classes = useStyles();
  const [state, setState] = React.useState({left: false});

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemText><strong><Link to="/home" style={{color:"white",textDecoration:"none"}}>Covid-19</Link></strong></ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText><strong><Link to="/stats" style={{color:"white",textDecoration:"none"}}>Stats</Link></strong></ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText href="#prevention" style={{color:"white",textDecoration:"none"}}><strong>Prevention</strong></ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText style={{color:"white",textDecoration:"none"}}><strong>About Us</strong></ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key={'left'}>
          <Button onClick={toggleDrawer('left', true)} className={classes.appBar}>
            <AppBar position="static">
                <Toolbar>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
                    <MenuIcon/>
                  </IconButton>
                </Toolbar>
            </AppBar>
          </Button>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list("left")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
