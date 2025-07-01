const CourseType = require('../models/CourseType');

exports.getAll = async (req, res) => {
  try {
    const types = await CourseType.getAll();
    res.status(200).json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const name = req.body.name?.trim();

  if (!name) {
    return res.status(400).json({ error: 'Il nome della tipologia è obbligatorio' });
  }

  try {
    const existing = await CourseType.findByName(name);
    if (existing) {
      return res.status(409).json({ error: 'Tipo di corso già esistente' });
    }

    const id = await CourseType.create(name);
    res.status(201).json({ id, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.createBulk = async (req, res) => {
  const names = req.body.names;
  if (!Array.isArray(names)) {
    return res.status(400).json({ error: 'Expected "names" as array of strings' });
  }

  const { inserted, skipped } = await CourseType.createBulk(names);

  const messages = [];

  if (skipped.empty.length > 0) {
    messages.push(
      `${skipped.empty.length === 1 ? 'An entry' : skipped.empty.length + ' entries'} had missing names`
    );
  }

  if (skipped.duplicate.length > 0) {
    const last = skipped.duplicate.pop();
    const msg = skipped.duplicate.length > 0
      ? `${skipped.duplicate.join(', ')} and ${last} already exist`
      : `${last} already exists`;
    messages.push(msg);
    skipped.duplicate.push(last);
  }

  res.status(201).json({
    inserted,
    skipped,
    ...(messages.length > 0 && { message: messages.join('. ') })
  });
};





exports.update = async (req, res) => {
  const name = req.body.name?.trim();

  if (!name) {
    return res.status(400).json({ error: 'Il nome è obbligatorio' });
  }

  try {
    const updated = await CourseType.update(req.params.id, name);
    if (!updated) {
      return res.status(404).json({ error: 'Tipologia non trovata' });
    }
    res.status(200).json({ message: 'Tipologia aggiornata' });
  } catch (err) {
if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Il nome scelto è già assegnato ad un\'altra tipologia' });
    }
    res.status(500).json({ error: err.message });  }
};



exports.remove = async (req, res) => {
  try {
    const deleted = await CourseType.remove(req.params.id);
    if (deleted === 0) {
      return res.status(404).json({ error: 'The selected id doesn\'t exist' });
    }
    res.status(200).json({ message: 'Tipologia eliminata' });
  } catch (err) {
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({ 
        error: 'The selected course type cannot be deleted because it is assigned to one or more courses.' 
      });
    }

    res.status(500).json({ error: err.message });
  }
};


