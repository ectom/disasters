import React, { useState } from 'react';
import { AppBar, Button, Modal, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LoginPage } from '../Login/LoginPage';
import { store } from '../../store';

const state = store.getState();
console.log('user_id', state.login.user_id);

const useStyles = makeStyles( ( theme ) => ( {
  title: {
    flexGrow: 1,
  },
  center: {
    margin: '0 auto'
  }
} ) );

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState( false );
  
  const handleOpen = () => {
    setOpen( !open );
  };
  
  const LoggedIn = () => {
    console.log(state);
    if(state.login.isLoggedIn){
      return <Typography>{state.user.user_name}</Typography>
    }
    else{
      return <Button color="inherit" onClick={handleOpen}>Login</Button>
    }
  };
  
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Disasters
          </Typography>
          <LoggedIn />
        </Toolbar>
        <Modal
          aria-labelledby="login-modal-title"
          aria-describedby="login-modal-description"
          open={open}
          onClose={handleOpen}
          className={classes.center}
        >
          <LoginPage handleOpen={handleOpen}/>
        </Modal>
      </AppBar>
    </>
  )
};

export default Navbar;