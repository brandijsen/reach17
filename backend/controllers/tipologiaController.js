const model = require('../models/tipologiaModel');

exports.getAll = async (req, res) => {
  try {
    const tipologie = await model.getAll();
    res.json(tipologie);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero delle tipologie.' });
  }
};

exports.getById = async (req, res) => {
  try {
    const tipologia = await model.getById(req.params.id);
    if (!tipologia) return res.status(404).json({ error: 'Tipologia non trovata.' });
    res.json(tipologia);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero della tipologia.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ error: 'Nome richiesto.' });
    const nuova = await model.create(nome);
    res.status(201).json(nuova);
  } catch (err) {
    res.status(500).json({ error: 'Errore nella creazione.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { nome } = req.body;
    await model.update(req.params.id, nome);
    res.json({ message: 'Tipologia aggiornata.' });
  } catch (err) {
    res.status(500).json({ error: 'Errore nell\'aggiornamento.' });
  }
};

exports.remove = async (req, res) => {
  try {
    await model.remove(req.params.id);
    res.json({ message: 'Tipologia eliminata.' });
  } catch (err) {
    res.status(500).json({ error: 'Errore nella cancellazione.' });
  }
};
