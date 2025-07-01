const CourseUniversity = require('../models/CourseUniversity');

exports.create = async (req, res) => {
  const { courseId, universityId } = req.params;
  try {
    await CourseUniversity.create(courseId, universityId);
    res.status(201).json({ message: 'Associazione creata' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { courseId, universityId } = req.params;
  try {
    const removed = await CourseUniversity.remove(courseId, universityId);
    if (!removed) {
      return res.status(404).json({ error: 'Associazione non trovata' });
    }
    res.status(200).json({ message: 'Associazione eliminata' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
