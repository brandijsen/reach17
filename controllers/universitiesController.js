const University = require('../models/University');

exports.getAll = async (req, res) => {
  try {
    const universities = await University.getAll();
    res.status(200).json(universities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const university = await University.getById(req.params.id);
    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }
    res.status(200).json(university);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const name = req.body.name?.trim();

  if (!name) {
    return res.status(400).json({ error: 'Il nome dell’università è obbligatorio' });
  }

  try {
    const existing = await University.findByName(name);
    if (existing) {
      return res.status(409).json({ error: 'The university already exist' });
    }

    const id = await University.create(name);
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

  const { inserted, skipped } = await University.createBulk(names);

  const messages = [];

  if (skipped.empty.length > 0) {
    messages.push(`${skipped.empty.length === 1 ? 'An entry' : skipped.empty.length + ' entries'} had missing names`);
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
    return res.status(400).json({ error: 'University name is required' });
  }

  try {
    // Recupera l'ateneo attuale
    const existing = await University.getById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "The selected university doesn't exist" });
    }

    // Verifica se il nuovo nome è lo stesso
    if (existing.name.toLowerCase() === name.toLowerCase()) {
      return res.status(400).json({ error: 'The selected university already has this name' });
    }

    // Procedi con aggiornamento
    const updated = await University.update(req.params.id, name);
    res.status(200).json({ message: `The university name has been successfully updated to '${name}'` });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        error: 'The selected name is already assigned to an already existing university'
      });
    }
    res.status(500).json({ error: err.message });
  }
};


exports.remove = async (req, res) => {
  try {
    const deleted = await University.remove(req.params.id);
    if (deleted === 0) {
      return res.status(404).json({ error: 'The selected university doesn\'t exist' });
    }
    res.status(200).json({ message: 'The selected university has been successfully eliminated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
