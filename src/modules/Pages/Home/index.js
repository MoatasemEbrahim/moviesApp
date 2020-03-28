import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import MoviesCategory from "./MoviesCategory/Index.js";
import MoviesSearch from './MoviesSearch/Index.js'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    alignSelf: "center",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: "15px",
    marginLeft: "auto",
    width: "auto",
    [theme.breakpoints.down("xs")]: {
      margin: "4px 7px 4px auto",
      width: "40%"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  },
  activeGridMenuBtn: {
    color: "#fff",
    marginTop:'5px'
  }
}));


const Home = props =>{
  const classes = useStyles();

  const [activeGrid, setActiveGrid] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [submitSearch, setSearchSubmission] = useState(false);
  const [anchor, setAnchor] = React.useState(null);

  const handleSearchChange = event =>{
    setSearchText(event.target.value)
  }

  const handleTabsChange = (event, newValue) => {
    setActiveGrid(newValue);
    setSearchText('')

  };

  const handleNavMenuClick = event => {
    setAnchor(event.currentTarget);
  };

  const handleNavMenuClose = activeGrid => event => {
    setAnchor(null);
    setActiveGrid(activeGrid);
  };

  const handleSearchSubmission = event =>{
    event.preventDefault()
    if(searchText){
      if (activeGrid !== 3)
        setActiveGrid(3)
        setSearchSubmission(!submitSearch)
    }
  }

    return (
      <div>
        <AppBar position="static">
          <div className="d-flex flex-wrap">
            <div className="d-none d-md-block">
              <Tabs
                value={activeGrid}
                onChange={handleTabsChange}
                aria-label="simple tabs example"
              >
                <Tab label="Top movies" />
                <Tab label="Upcoming movies" />
                <Tab label="Now playing movies" />
                <Tab label="Search" className='d-none' />
              </Tabs>
            </div>
            <div className="d-block d-sm-none">
              <Button
                className="m-1"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleNavMenuClick}
                variant="contained"
                color="primary"
              >
                <span className={classes.activeGridMenuBtn}>
                  <strong>
                    {(activeGrid === 0 && "Top movies") ||
                      (activeGrid === 1 && "Upcoming movies") ||
                      (activeGrid === 2 && "Now playing movies") ||
                      (activeGrid === 3 && "Search results:")}
                  </strong>
                </span>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchor}
                keepMounted
                open={Boolean(anchor)}
                onClose={handleNavMenuClose(activeGrid)}
              >
                <MenuItem onClick={handleNavMenuClose(0)}>Top movies</MenuItem>
                <MenuItem onClick={handleNavMenuClose(1)}>Upcoming movies</MenuItem>
                <MenuItem onClick={handleNavMenuClose(2)}>Now playing movies</MenuItem>
              </Menu>
            </div>
              <div className={classes.search}>
              <form onSubmit={handleSearchSubmission}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    value={searchText}
                    onChange={handleSearchChange}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </form>
              </div>
          </div>
        </AppBar>
        {activeGrid ===0 ?(<MoviesCategory category="top_rated" />):''}
        {activeGrid === 1 ?(<MoviesCategory category="upcoming" />) : ''}
        {activeGrid === 2 ?(<MoviesCategory category="now_playing" />) : ''}
        {activeGrid === 3 ? (<MoviesSearch submitSearch={submitSearch} searchText={searchText} />) : ''}
        
      </div>
    );
}

export default Home;
