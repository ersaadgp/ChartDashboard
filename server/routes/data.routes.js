const express = require('express');
const DataService = require('../services/data.service');

const router = express.Router();

router.delete('/:id', DataService.deleteData);

router.get('/all-pasien', DataService.getAllPasien);

router.get('/', DataService.getPasien);

router.get('/:pasienID', DataService.getPasienByID);

router.patch('/:id', DataService.editData);

router.post('/', DataService.createNewData);

module.exports = router;
