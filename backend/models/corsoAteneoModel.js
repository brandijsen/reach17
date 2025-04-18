const db = require('../db'); // Assicurati di importare la connessione al database

// Associa un corso a un ateneo
const associateCourseToUniversity = async (id_corso, id_ateneo) => {
  const query = 'INSERT INTO corso_ateneo (id_corso, id_ateneo) VALUES (?, ?)';
  await db.query(query, [id_corso, id_ateneo]);
};

// Rimuove l'associazione di un corso a un ateneo
const removeAssociation = async (id_corso, id_ateneo) => {
  const query = 'DELETE FROM corso_ateneo WHERE id_corso = ? AND id_ateneo = ?';
  await db.query(query, [id_corso, id_ateneo]);
};

// Ottieni tutte le associazioni corso-ateneo
const getAssociations = async () => {
  const query = `
    SELECT corso.nome AS nome_corso, ateneo.nome AS nome_ateneo
    FROM corso
    INNER JOIN corso_ateneo ON corso.id = corso_ateneo.id_corso
    INNER JOIN ateneo ON ateneo.id = corso_ateneo.id_ateneo`;
  const [rows] = await db.query(query);
  return rows;
};

const updateAssociation = async (old_id_corso, old_id_ateneo, new_id_corso, new_id_ateneo) => {
  const query = `
    UPDATE corso_ateneo 
    SET id_corso = ?, id_ateneo = ?
    WHERE id_corso = ? AND id_ateneo = ?
  `;
  await db.query(query, [new_id_corso, new_id_ateneo, old_id_corso, old_id_ateneo]);
};

// Ottieni tutte le associazioni per corso
const getByCorsoId = async (id_corso) => {
  const [rows] = await db.query('SELECT * FROM corso_ateneo WHERE id_corso = ?', [id_corso]);
  return rows;
};

// Ottieni tutte le associazioni per ateneo
const getByAteneoId = async (id_ateneo) => {
  const [rows] = await db.query('SELECT * FROM corso_ateneo WHERE id_ateneo = ?', [id_ateneo]);
  return rows;
};

const getById = async (id_corso, id_ateneo) => {
  const [rows] = await db.query(
    'SELECT * FROM corso_ateneo WHERE id_corso = ? AND id_ateneo = ?',
    [id_corso, id_ateneo]
  );
  return rows[0];
};


module.exports = {
  associateCourseToUniversity,
  removeAssociation,
  getAssociations,
  updateAssociation,
  getByCorsoId,
  getByAteneoId,
  getById,

};
