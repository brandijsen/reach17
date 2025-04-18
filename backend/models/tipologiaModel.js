const db = require('../db');

const getAll = async () => {
  const [rows] = await db.query('SELECT * FROM tipologie_corso');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM tipologie_corso WHERE id = ?', [id]);
  return rows[0];
};

const create = async (nome) => {
  const [result] = await db.query('INSERT INTO tipologie_corso (nome) VALUES (?)', [nome]);
  return { id: result.insertId, nome };
};

const update = async (id, nome) => {
  await db.query('UPDATE tipologie_corso SET nome = ? WHERE id = ?', [nome, id]);
};

const remove = async (id) => {
  await db.query('DELETE FROM tipologie_corso WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
