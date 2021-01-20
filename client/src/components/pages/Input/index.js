import React, { Component, useState } from 'react';
import { 
    Button,
    Container, 
    Grid, Paper, 
    Fade, 
    Backdrop,
    Modal }
from '@material-ui/core';
import DataList from '../../Input/dataList'
import Filter from '../../Input/filter'
import Input from '../../Input/input'
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../Navbar/index'

const useStyles = makeStyles((theme) => ({
    Button: {
      width: '100%',
      height: '5vh',
      color: 'white',
      marginTop: '1rem'
    },
    modal: {
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
        opacity: 1,
      },
    overlay: {
        backgroundColor: '#fff',
        opacity: 0,
    },
  }));

export default function App (){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [id, setId] = useState('');

    const handleOpen = (id) => {
        setId(id);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
    <>
        <Navbar/>
        <Container>
        <Grid 
        style={{marginTop: '2rem'}}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={3}>
            <Grid 
                item xs={8}
            >
            <DataList></DataList>
            </Grid>
            <Grid 
                item xs={4}
            >
                <Filter></Filter>
                <Button 
                className={classes.Button}
                variant="contained"
                color="primary"
                onClick={() => handleOpen()}
                >
                    Tambah Data
                </Button>
            </Grid>
        </Grid>
        <Modal
            className={classes.modal}
            modalId={id}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
              >
            <Fade in={open}>
                <Input></Input>
            </Fade>
        </Modal>
        </Container>
    </>
    )
  
}

