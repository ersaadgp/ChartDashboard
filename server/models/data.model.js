const db = require('../config');

class DataModel {
  createNewData(no_pasien, status, usia, jenis_kelamin, tanggal, callback) {
    db.query(
      `insert into pasien values (($1), ($3), ($4), ($5), ($2)) returning *`,
      [no_pasien, status, usia, jenis_kelamin, tanggal],
      callback
    );
  }

  deleteData(id, callback) {
    db.query(`delete from books  where id = ($1) returning *`, [id], callback);
  }

  editData(id, stock, callback) {
    db.query(
      `update books set stock = ($1) where id = ($2) returning *`,
      [stock, id],
      callback
    );
  }

  getAllData(callback) {
    db.query(`select * from books`, callback);
  }

  getAllPasien(callback) {
    db.query(`select * from pasien`, callback);
  }

  getPasien(status, usia, tanggal1, tanggal2, callback) {
    db.query(`select * from pasien where status = ($1) and usia = ($2) and tanggal between ($3) and ($4)`,
    [status, usia, tanggal1, tanggal2],
    callback);
  }

  getPasienByID(id, callback) {
    db.query('select * from pasien where no_pasien = ($1)', [id], callback);
  }
}

module.exports = new DataModel();
