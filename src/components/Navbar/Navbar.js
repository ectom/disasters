import React, { useState } from 'react';
import { AppBar, Button, Modal, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LoginPage } from '../Login/LoginPage';

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
  
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Disasters
          </Typography>
          <Button color="inherit" onClick={handleOpen}>Login</Button>
        </Toolbar>
        <Modal
          aria-labelledby="login-modal-title"
          aria-describedby="login-modal-description"
          open={open}
          onClose={handleOpen}
          className={classes.center}
        >
          <LoginPage/>
        </Modal>
      </AppBar>
    </>
  )
};

export default Navbar;