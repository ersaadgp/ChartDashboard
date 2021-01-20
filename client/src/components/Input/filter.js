import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
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
    height: '21rem',
    // width: '25rem',
    padding: '2rem',
  },
  Input: {
    margin: '0.75rem',
    width: '15rem',
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
  const [firstDate, setFirstDate] = React.useState('');
  const [lastDate, setLastDate] = React.useState('');

  const inputData = (formData) => {
    return async (dispatch) => {
      await apis
        .get('/data', formData)
        .then((response) => {
          console.log()
          dispatch({
            type: actionTypes.FETCH_DATAS_FILTERED,
            payload: response.data,
          });
          history.push(
            `/data/filtered`
          );
        })
        .catch((err) => {});
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInput({ 
      status: status,
      usia: usia,
      tanggal1 : firstDate,
      tanggal2 : lastDate,
    });
    setUsia('')
    setStatus('')
    setFirstDate('')
    setLastDate('')
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

  const handleFirstDate = (event) => {
    setFirstDate(event.target.value);
  };

  const handleLastDate = (event) => {
    setLastDate(event.target.value);
  };

  return (
    <>
      <Paper className={classes.Paper} elevation={3}>
        <Typography variant="h5">Masukan Data</Typography>
        <hr></hr>
        <Input
          className={classes.Input}
          placeholder="Status"
          value={status}
          onChange={handleStatusChange}
          inputProps={{ 'aria-label': 'startDate' }}
        />
        <Input
          className={classes.Input}
          placeholder="Usia"
          value={usia}
          onChange={handleUsiaChange}
          inputProps={{ 'aria-label': 'duration' }}
        />
        <Input
          type="date"
          className={classes.Input}
          placeholder="Dari Tanggal"
          value={firstDate}
          onChange={handleFirstDate}
          inputProps={{ 'aria-label': 'startDate' }}
        />
        <Input
          type="date"
          className={classes.Input}
          placeholder="Sampai Tanggal"
          value={lastDate}
          onChange={handleLastDate}
          inputProps={{ 'aria-label': 'duration' }}
        />
        <Grid>
            <Button 
            className={classes.Button}
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#7189BF' }}
            onClick={handleSubmit}
            >
            Cari
            </Button>
        </Grid>
      </Paper>
    </>
  );
}
