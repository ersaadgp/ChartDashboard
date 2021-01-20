import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../logo.png'
import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    marginRight: theme.spacing(5),
  },
  menuButton: {
    padding: theme.spacing(0.5, 3),
    margin: theme.spacing(0, 3),
    color: 'white',
    textDecoration: 'none !important',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: 'white',
      color: theme.palette.grey[900],
    },
  },
  navbar: {
    backgroundColor: theme.palette.grey[900],
  },
  navigationItem: {
    flexGrow: 1,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  inlineflex: {
    display: 'inline-block',
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar className={classes.uppercase}>
          <img src={Logo} width={50} alt="gsh logo" className={classes.logo} />
          {/* <Typography variant="h6">Covid-19</Typography> */}
          <div className={classes.navigationItem}>
            <Box display="flex">
              <Link to="/" className={classes.menuButton}>
                <Typography variant="h6">Dashboard</Typography>
              </Link>
              <Link to="/data" className={classes.menuButton}>
                <Typography variant="h6">Data</Typography>
              </Link>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
