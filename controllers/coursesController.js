const Course = require('../models/Course');

exports.create = async (req, res) => {
  const name = req.body.name?.trim();
  const typeId = req.body.type_id;

  if (!name) {
    return res.status(400).json({ error: 'Il nome del corso è obbligatorio' });
  }

  if (!typeId || isNaN(typeId)) {
    return res.status(400).json({ error: 'type_id non valido' });
  }

  try {
    const typeExists = await Course.existsTypeId(typeId);
    if (!typeExists) {
      return res.status(404).json({ error: 'Tipologia non trovata' });
    }

    const existing = await Course.findByName(name);
    if (existing) {
      return res.status(409).json({ error: 'Corso già esistente' });
    }

    const id = await Course.create(name, typeId);
    res.status(201).json({ id, name, type_id: typeId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const name = req.body.name?.trim();
  const typeId = req.body.type_id;

  if (!name) {
    return res.status(400).json({ error: 'Il nome è obbligatorio' });
  }

  if (!typeId || isNaN(typeId)) {
    return res.status(400).json({ error: 'type_id non valido' });
  }

  try {
    const updated = await Course.update(req.params.id, name, typeId);
    if (!updated) {
      return res.status(404).json({ error: 'Corso non trovato' });
    }
    res.status(200).json({ message: 'Corso aggiornato' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Il nome scelto è già assegnato ad un altro corso' });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Course.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Corso non trovato' });
    }
    res.status(200).json({ message: 'Corso eliminato' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const courses = await Course.findAll(req.query);
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



