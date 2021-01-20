import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, TextField, MenuItem} from '@material-ui/core';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Grid, Typography, FormLabel,FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import apis from '../../apis';
import actionTypes from '../../constants/action-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  Paper: {
    textAlign: 'center',
    // margin: '2rem',
    height: '30rem',
    width: '20rem',
    padding: '2rem',
  },
  Input: {
    margin: '0.75rem',
    width: '15rem',
    textAlign: 'left'
  },
  Button: {
    margin: '2rem 1rem',
    width: '6rem',

    color: 'white',
  },
  Button2: {
    borderRadius: '2rem',
    width: '25rem',
    height: '8vh',
    backgroundColor: '#72D6C9',
    color: 'white',
  },
}));

export default function InputForm() {

  const dispatch = useDispatch('');
  const history = useHistory();
  const classes = useStyles();

  const [usia, setUsia] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [date, setDate] = React.useState('');
  const [noPasien, setNoPasien] = React.useState('');
  const [jk, setJK] = React.useState('');

  const inputData = (formData) => {
    return async (dispatch) => {
      await apis
        .post('/data', formData)
        .then((response) => {
          console.log()
          dispatch({
            type: actionTypes.CREATE_DATA,
            payload: response.data,
          });
          history.push(
            `/data`
          );
        })
        .catch((err) => {});
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInput({ 
      no_pasien: noPasien,
      status: status,
      usia: usia,
      tanggal : date,
      jenis_kelamin : jk,
    });
    setUsia('')
    setStatus('')
    setDate('')
    setNoPasien('')
    setJK('')
  };

  const handleInput = (formData) => {
    dispatch(inputData(formData));
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUsiaChange = (event) => {
    setUsia(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleNoPasienChange = (event) => {
    setNoPasien(event.target.value);
  };

  const handleJKChange = (event) => {
    setJK(event.target.value);
  };

  return (
    <>
      <Paper className={classes.Paper} elevation={3}>
        <Typography variant="h5">Masukan Data</Typography>
        <hr></hr>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.Input}
          label="No. Pasien"
          value={noPasien}
          onChange={handleNoPasienChange}
          inputProps={{ 'aria-label': 'duration' }}
        />
        <TextField
        InputLabelProps={{
            shrink: true,
          }}
            className={classes.Input}
            select
            label="Status"
            value={status}
            onChange={handleStatusChange}
        >
            <MenuItem value={'Sembuh'}>Sembuh</MenuItem>
            <MenuItem value={'Positif'}>Positif</MenuItem>
            <MenuItem value={'Meninggal'}>Meninggal</MenuItem>
        </TextField>
        <TextField
        InputLabelProps={{
            shrink: true,
          }}
            className={classes.Input}
            select
            label="Jenis Kelamin"
            value={jk}
            onChange={handleJKChange}
        >
            <MenuItem value={'L'}>Pria</MenuItem>
            <MenuItem value={'P'}>Wanita</MenuItem>
        </TextField>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.Input}
          label="Usia"
          value={usia}
          onChange={handleUsiaChange}
          inputProps={{ 'aria-label': 'duration' }}
        />
        <TextField
        InputLabelProps={{
            shrink: true,
          }}
          type="date"
          className={classes.Input}
          label="Tanggal"
          value={date}
          onChange={handleDateChange}
          inputProps={{ 'aria-label': 'startDate' }}
        />
        <Grid>
            <Button 
            className={classes.Button}
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#7189BF' }}
            onClick={handleSubmit}
            >
            Simpan
            </Button>
        </Grid>
      </Paper>
    </>
  );
}
