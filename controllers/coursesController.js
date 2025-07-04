const Course = require('../models/Course');

exports.create = async (req, res) => {
  const name = req.body.name?.trim();
  const typeId = req.body.type_id;

  if (!name) {
    return res.status(400).json({ error: 'The course name is required' });
  }

  if (!typeId || isNaN(typeId) || !(await Course.existsTypeId(typeId))) {
    return res.status(400).json({ error: 'The assigned course type does not exist' });
  }

  try {
    const existing = await Course.findByName(name);
    if (existing) {
      return res.status(409).json({ error: 'The course already exists' });
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
    return res.status(400).json({ error: 'Course name is required' });
  }

  if (!typeId || isNaN(typeId)) {
    return res.status(400).json({ error: 'type_id must be a valid number' });
  }

  try {
    const existing = await Course.getById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const typeExists = await Course.existsTypeId(typeId);
    if (!typeExists) {
      return res.status(404).json({ error: 'Course type not found' });
    }

    if (
      existing.name.toLowerCase() === name.toLowerCase() &&
      existing.type_id === Number(typeId)
    ) {
      return res.status(400).json({
        error: 'The selected course already has this name and course type'
      });
    }

    const updated = await Course.update(req.params.id, name, typeId);
    if (!updated) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const messages = [];
    if (existing.name.toLowerCase() !== name.toLowerCase()) {
      messages.push(`Course name updated to '${name}'`);
    }

    if (existing.type_id !== Number(typeId)) {
      const typeName = await Course.getTypeNameById(typeId);
      messages.push(`Course type changed to '${typeName}'`);
    }

    res.status(200).json({ message: messages.join('. ') });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        error: 'The selected name is already assigned to another course'
      });
    }
    res.status(500).json({ error: err.message });
  }
};


exports.remove = async (req, res) => {
  try {
    const deleted = await Course.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'The selected course doesn\'t exist' });
    }
    res.status(200).json({ message: 'The selected course has been succesfully eliminated' });
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

exports.getById = async (req, res) => {
  try {
    const course = await Course.getById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




