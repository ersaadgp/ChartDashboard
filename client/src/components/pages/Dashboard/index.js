import React, { Component } from 'react';
import { Container, Grid } from '@material-ui/core';
import Chart from '../../Chart/lineChart'
import Navbar from '../../Navbar/index'

export default function App (){
  
    return (
    <>
        <Navbar></Navbar>
        <Container>
            <Grid item xs={12}>
                <Chart></Chart>
            </Grid>
        </Container>
      </>
    )
  
}

