import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from 'react';


import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CodeIcon from "@material-ui/icons/Code";
import { Link, NavLink } from "react-router-dom";
import Register from "features/auth/components/register/register";
import { Close } from "@material-ui/icons";
import Login from "features/auth/components/login/login";
import { Box, Menu, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logout } from "features/auth/userSlice";


//style cho MUI 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  link: {

    color: '#fff',
    textDecoration: 'none',

  },


  closeButton : {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,

  }
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
}

export default function Header() {

  const dispatch = useDispatch();

  const loggedInUser = useSelector(state => state.user.current);

  const isLoggedIn = !! loggedInUser.id;

  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState(MODE.LOGIN);

  const [anchorEl, setAnchorEl] = React.useState(null);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <CodeIcon className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">KSgears</Link>
          </Typography>

          <NavLink className={classes.link} to="/song">
            <Button color="inherit">Song1</Button>
          </NavLink>

          <NavLink className={classes.link} to="/song">
            <Button color="inherit">Song2</Button>
          </NavLink>


          {! isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
            Login
            </Button>
          )}

          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircleIcon />

            </IconButton>
          )}

          
        </Toolbar>
      </AppBar>

      <Menu
        
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
       
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog 
      
      disableBackdropClick

      disableEscapeKeyDown
      
      open={open} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title"
      >

        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close/>
        </IconButton>
        
        <DialogContent>

          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog = {handleClose}/>

            <Box textAlign="center">

              <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                Already have an account. Login here.
              </Button>

            </Box>
           </>

          )}



          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog = {handleClose}/>

            <Box textAlign="center">

              <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                Dont have an account. Register here.
              </Button>

            </Box>
           </>

          )}

          
          
        </DialogContent>

        
      </Dialog>
    </div>
  );
}
