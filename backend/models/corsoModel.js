const db = require('../db');

// Funzione per ottenere tutti i corsi
const getAll = async () => {
  const query = 'SELECT * FROM corso';
  const [rows] = await db.query(query);
  return rows;
};

const countAll = async () => {
  const query = 'SELECT COUNT(*) AS totale FROM corso';
  const [rows] = await db.query(query);
  return rows[0].totale;
};

// Funzione per ottenere un corso per ID
const getById = async (id) => {
  const query = 'SELECT * FROM corso WHERE id = ?';
  const [rows] = await db.query(query, [id]);
  return rows[0];  // Restituiamo il primo risultato
};

// Funzione per creare un nuovo corso
const create = async (nome, id_tipologia) => {
  const query = 'INSERT INTO corso (nome, id_tipologia) VALUES (?, ?)';
  const [result] = await db.query(query, [nome, id_tipologia]);
  return { id: result.insertId, nome, id_tipologia };
};

// Funzione per aggiornare un corso esistente
const update = async (id, nome, id_tipologia) => {
  const query = 'UPDATE corso SET nome = ?, id_tipologia = ? WHERE id = ?';
  await db.query(query, [nome, id_tipologia, id]);
  return { id, nome, id_tipologia };
};

// Funzione per eliminare un corso
const remove = async (id) => {
  const query = 'DELETE FROM corso WHERE id = ?';
  await db.query(query, [id]);
};

const getCorsiConAtenei = async (nome_corso, id_tipologia) => {
  let query = `
    SELECT c.id, c.nome AS nome_corso, c.id_tipologia, a.id AS id_ateneo, a.nome AS nome_ateneo
    FROM corso c
    JOIN corso_ateneo ca ON c.id = ca.id_corso
    JOIN ateneo a ON a.id = ca.id_ateneo
    WHERE 1=1
  `;
  const params = [];

  if (nome_corso) {
    query += ' AND c.nome LIKE ?';
    params.push(`%${nome_corso}%`);
  }

  if (id_tipologia) {
    query += ' AND c.id_tipologia = ?';
    params.push(id_tipologia);
  }

  const [rows] = await db.query(query, params);
  return rows;
};



module.exports = { getAll, getById, create, update, remove, getCorsiConAtenei, countAll };
