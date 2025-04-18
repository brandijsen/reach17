const model = require('../models/corsoModel');

// Funzione per ottenere tutti i corsi
exports.getAll = async (req, res) => {
  try {
    const corsi = await model.getAll();
    res.json(corsi);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero dei corsi.' });
  }
};

// Funzione per ottenere un corso per ID
exports.getById = async (req, res) => {
  try {
    const corso = await model.getById(req.params.id);
    if (!corso) return res.status(404).json({ error: 'Corso non trovato.' });
    res.json(corso);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero del corso.' });
  }
};

// Funzione per creare un nuovo corso
exports.create = async (req, res) => {
  try {
    const { nome, id_tipologia } = req.body;
    if (!nome || !id_tipologia) {
      return res.status(400).json({ error: 'Nome e tipologia del corso sono richiesti.' });
    }
    const nuovoCorso = await model.create(nome, id_tipologia);
    res.status(201).json(nuovoCorso);
  } catch (err) {
    res.status(500).json({ error: 'Errore nella creazione del corso.' });
  }
};

// Funzione per aggiornare un corso esistente
exports.update = async (req, res) => {
  try {
    const { nome, id_tipologia } = req.body;
    if (!nome || !id_tipologia) {
      return res.status(400).json({ error: 'Nome e tipologia del corso sono richiesti.' });
    }
    const aggiornamentoCorso = await model.update(req.params.id, nome, id_tipologia);
    res.json(aggiornamentoCorso);
  } catch (err) {
    res.status(500).json({ error: 'Errore nell\'aggiornamento del corso.' });
  }
};

// Funzione per eliminare un corso
exports.remove = async (req, res) => {
  try {
    await model.remove(req.params.id);
    res.json({ message: 'Corso eliminato.' });
  } catch (err) {
    res.status(500).json({ error: 'Errore nella cancellazione del corso.' });
  }
};


exports.getCorsiConAtenei = async (req, res) => {
  const { nome_corso, id_tipologia } = req.query;
  console.log('Query Params:', req.query);
  try {
    const corsi = await model.getCorsiConAtenei(nome_corso, id_tipologia);
    res.json(corsi);
  } catch (err) {
    console.error('Errore nel recupero dei corsi con atenei:', err);
    res.status(500).json({ error: 'Errore nel recupero dei corsi con atenei.' });
  }
};

exports.countAll = async (req, res) => {
  try {
    const totale = await model.countAll();
    res.json({ totale });
  } catch (err) {
    res.status(500).json({ error: 'Errore nel conteggio dei corsi.' });
  }
};

