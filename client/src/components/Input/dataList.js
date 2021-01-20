import React, { useState, useEffect } from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TablePagination,
    IconButton,
    Button,    
    Fade, 
    Backdrop,
    Modal
} from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useSelector, useDispatch } from 'react-redux';
import apis from '../../apis';
import actionTypes from '../../constants/action-types';
import Edit from '../Input/edit'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    // maxHeight: 375,
    height: '78vh',
  },
  cell: {
    padding: '1rem',
    // maxHeight: '1rem'
  },
  action: {
    padding: '1rem',
    width: '5rem',
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
});

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
      marginRight: theme.spacing(10),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
}

export default function PasienList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = useStyles();
    const pasiens = useSelector((state) =>
        Object.values(state.data)
    );
    const [open, setOpen] = React.useState(false);
    const [id, setId] = useState('');

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const month = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
    return `${
        month[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

    const dispatch = useDispatch();

    const fetchAllPasien = () => {
        return async (dispatch) => {
        await apis
            .get(`/data/all-pasien`)
            .then((response) => {
            dispatch({
                type: actionTypes.FETCH_DATAS,
                payload: response.data,
            });
            })
            .catch((err) => {});
        };
    };
    useEffect(() => {
        dispatch(fetchAllPasien());
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleOpen = (id) => {
        setId(id);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        clear()
    };

    const clear = () => {
        return (dispatch) => {
          dispatch({
            type: actionTypes.CLEAR_PASIEN_ID,
          });
        };
      };
    
    if (!Object.keys(pasiens).length) return <div>Data Kosong</div>;
    else
        return (
            <Paper className={classes.root}>
            <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tanggal</TableCell>
                        <TableCell align="left">No. Pasien</TableCell>
                        <TableCell align="left">Usia</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {pasiens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pasien) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={pasien.no_pasien}>
                        <TableCell className={classes.cell}>
                            {formatDate(pasien.tanggal)}
                        </TableCell>
                        <TableCell className={classes.cell}>
                            {pasien.no_pasien}
                        </TableCell>
                        <TableCell className={classes.cell}>
                            {`${pasien.usia} Tahun`}
                        </TableCell>
                        <TableCell className={classes.cell}>
                            {pasien.status}
                        </TableCell>
                        <TableCell className={classes.action}>
                            <Button 
                            color="primary" 
                            fullWidth 
                            variant="contained"
                            onClick={() => handleOpen(pasien.no_pasien)}>Edit</Button>
                        </TableCell>
                        <TableCell className={classes.action}>
                            <Button color="secondary" variant="contained">Delete</Button>
                        </TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            component="div"
            count={pasiens.length}
            rowsPerPage={10}
            page={page}
            onChangePage={handleChangePage}
            ActionsComponent={TablePaginationActions}
            />
            <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
              >
            <Fade in={open}>
                <Edit pasienID={id}></Edit>
            </Fade>
            </Modal>
        </Paper>
    );
}
