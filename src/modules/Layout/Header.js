import React,{useState} from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";

import CustomStyles from './Layout.module.scss'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        margin: '0 10px',
    },
}));

const Header = withRouter(props => {
  let pageNumber = 0;
  if(props.location.pathname === '/favourite')
    pageNumber=1;

  const classes = useStyles();
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const [activePage, setActivePage] = useState(pageNumber);

  const handleDrawer = event => {
    toggleDrawer(!isDrawerOpen);
  };

  const changeActivePage = page => event => {
    setActivePage(page);
  };

  const pages = [
    {
      order: 0,
      title: "Home",
      link:'/'
    },
    {
      order: 1,
      title: "Favourite",
      link:'favourite'
    }
  ]; 

  return (
    <nav className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleDrawer}
            edge="start"
            className="d-block d-sm-none"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Link
            onClick={changeActivePage(0)}
            className={`${CustomStyles.logo} pt-2`}
            to="/"
          >
            <h2>Movies App</h2>
          </Link>
          <>
            {pages.map(page => (
              <Link
                key={page.order}
                className={`${CustomStyles.navLink} d-none d-md-block
                ${activePage === page.order ? "border-bottom" : ""}
                `}
                onClick={changeActivePage(page.order)}
                to={page.link}
              >
                <Typography variant="h6" className={classes.title}>
                  {page.title}
                </Typography>
              </Link>
            ))}
          </>
        </Toolbar>
      </AppBar>

      {/* displayed only on mobile screens*/}
      <>
        <Drawer
          open={isDrawerOpen}
          onClose={handleDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <List>
            {pages.map(page => (
              <React.Fragment key={page.order}>
                <ListItem button onClick={handleDrawer}>
                  <Link
                    className={CustomStyles.navLink}
                    onClick={changeActivePage(page.order)}
                    to={page.link}
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={page.title} />
                  </Link>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Drawer>
      </>
    </nav>
  );
});

export default Header;

