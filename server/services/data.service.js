const DataModel = require('../models/data.model');

class Data {
  createNewData(request, response) {
    const { no_pasien, status, usia, jenis_kelamin, tanggal } = request.body;

    DataModel.createNewData(no_pasien, status, usia, jenis_kelamin, tanggal, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      response.status(200).json(result);
    });
  }

  deleteData(request, response) {
    const { id } = request.params;

    DataModel.deleteData(id, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      response.status(200).json(result);
    });
  }

  editData(request, response) {
    const { id } = request.params;
    const { stock } = request.body;

    DataModel.editData(id, stock, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      response.status(200).json(result);
    });
  }

  getAllData(request, response) {
    DataModel.getAllData((error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      response.status(200).json(result);
    });
  }

  getAllPasien(request, response) {
    DataModel.getAllPasien((error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      response.status(200).json(result);
    });
  }

  getPasien(request, response) {
    const { status, usia, tanggal1, tanggal2 } = request.body;

    DataModel.getPasien(status, usia, tanggal1, tanggal2, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      response.status(200).json(result);
    });
  }

  getPasienByID(request, response) {
    const id = request.params.pasienID;

    DataModel.getPasienByID(id, (error, result) => {
      if (Object.keys(error).length !== 0) {
        return response.status(500).json(error);
      }

      response.status(200).json(result);
    });
  }
}

module.exports = new Data();
