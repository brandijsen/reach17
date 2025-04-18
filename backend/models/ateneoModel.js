const db = require('../db');

// Funzione per ottenere tutti gli atenei
const getAll = async () => {
  const query = 'SELECT * FROM ateneo';
  const [rows] = await db.query(query);
  return rows;
};

// Funzione per ottenere un ateneo per ID
const getById = async (id) => {
  const query = 'SELECT * FROM ateneo WHERE id = ?';
  const [rows] = await db.query(query, [id]);
  return rows[0];  // Restituiamo il primo risultato
};

// Funzione per creare un nuovo ateneo
const create = async (nome) => {
  const query = 'INSERT INTO ateneo (nome) VALUES (?)';
  const [result] = await db.query(query, [nome]);
  return { id: result.insertId, nome };
};

// Funzione per aggiornare un ateneo esistente
const update = async (id, nome) => {
  const query = 'UPDATE ateneo SET nome = ? WHERE id = ?';
  await db.query(query, [nome, id]);
  return { id, nome };
};

// Funzione per eliminare un ateneo
const remove = async (id) => {
  const query = 'DELETE FROM ateneo WHERE id = ?';
  await db.query(query, [id]);
};

module.exports = { getAll, getById, create, update, remove };
