const model = require('../models/ateneoModel');

exports.getAll = async (req, res) => {
  try {
    const atenei = await model.getAll();
    res.json(atenei);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero degli atenei.' });
  }
};

exports.getById = async (req, res) => {
  try {
    const ateneo = await model.getById(req.params.id);
    if (!ateneo) return res.status(404).json({ error: 'Ateneo non trovato.' });
    res.json(ateneo);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero dell\'ateneo.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ error: 'Nome richiesto.' });
    const nuovoAteneo = await model.create(nome);
    res.status(201).json(nuovoAteneo);
  } catch (err) {
    res.status(500).json({ error: 'Errore nella creazione dell\'ateneo.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { nome } = req.body;
    await model.update(req.params.id, nome);
    res.json({ message: 'Ateneo aggiornato.' });
  } catch (err) {
    res.status(500).json({ error: 'Errore nell\'aggiornamento dell\'ateneo.' });
  }
};

exports.remove = async (req, res) => {
  try {
    await model.remove(req.params.id);
    res.json({ message: 'Ateneo eliminato.' });
  } catch (err) {
    res.status(500).json({ error: 'Errore nella cancellazione dell\'ateneo.' });
  }
};
