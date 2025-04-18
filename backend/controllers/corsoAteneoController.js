const model = require('../models/corsoAteneoModel');

// Associa un corso a un ateneo
exports.associate = async (req, res) => {
  try {
    const { id_corso, id_ateneo } = req.body;
    
    // Controllo se i parametri sono stati passati
    if (!id_corso || !id_ateneo) {
      return res.status(400).json({ error: 'Corso e Ateneo sono richiesti.' });
    }
    
    // Chiamata al modello per associare
    await model.associateCourseToUniversity(id_corso, id_ateneo);
    
    res.status(201).json({ message: 'Corso associato all\'Ateneo con successo.' });
  } catch (err) {
    res.status(500).json({ error: 'Errore nell\'associazione.' });
  }
};

// Recupera tutte le associazioni
exports.getAssociations = async (req, res) => {
  try {
    const associazioni = await model.getAssociations();
    res.json(associazioni);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero delle associazioni.' });
  }
};

exports.updateAssociation = async (req, res) => {
  try {
    const { old_id_corso, old_id_ateneo, new_id_corso, new_id_ateneo } = req.body;

    if (!old_id_corso || !old_id_ateneo || !new_id_corso || !new_id_ateneo) {
      return res.status(400).json({ error: 'Tutti i campi sono richiesti.' });
    }

    await model.updateAssociation(old_id_corso, old_id_ateneo, new_id_corso, new_id_ateneo);
    res.json({ message: 'Associazione aggiornata con successo.' });
  } catch (err) {
    res.status(500).json({ error: 'Errore nell\'aggiornamento dell\'associazione.' });
  }
};

// Rimuove una specifica associazione
exports.removeAssociation = async (req, res) => {
  try {
    const { id_corso, id_ateneo } = req.params;
    
    // Controllo per assicurarci che i parametri siano presenti
    if (!id_corso || !id_ateneo) {
      return res.status(400).json({ error: 'Corso e Ateneo sono necessari per eliminare l\'associazione.' });
    }

    // Chiamata al modello per rimuovere
    await model.removeAssociation(id_corso, id_ateneo);
    res.json({ message: 'Associazione eliminata con successo.' });
  } catch (err) {
    res.status(500).json({ error: 'Errore nella cancellazione dell\'associazione.' });
  }
};

// Ottieni tutte le associazioni per uno specifico corso
exports.getByCorsoId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await model.getByCorsoId(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero delle associazioni per il corso.' });
  }
};

// Ottieni tutte le associazioni per uno specifico ateneo
exports.getByAteneoId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await model.getByAteneoId(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero delle associazioni per l\'ateneo.' });
  }
};

exports.getById = async (req, res) => {
  const { id_corso, id_ateneo } = req.params;
  try {
    const result = await model.getById(id_corso, id_ateneo);
    if (!result) {
      return res.status(404).json({ error: 'Associazione non trovata.' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero dell\'associazione.' });
  }
};

