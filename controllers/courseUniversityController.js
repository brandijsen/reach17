const CourseUniversity = require('../models/CourseUniversity');

exports.getAll = async (req, res) => {
  try {
    const associations = await CourseUniversity.getAll();

    // Ristruttura il risultato
    const formatted = associations.map(a => ({
      course: {
        id: a.course_id,
        name: a.course_name
      },
      university: {
        id: a.university_id,
        name: a.university_name
      }
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { course_id, university_id } = req.body;

  if (!course_id || !university_id || isNaN(course_id) || isNaN(university_id)) {
    return res.status(400).json({ error: 'course_id and university_id must be valid numbers' });
  }

  try {
    const courseExists = await CourseUniversity.courseExists(course_id);
    const universityExists = await CourseUniversity.universityExists(university_id);

    const missing = [];
    if (!courseExists) missing.push('course');
    if (!universityExists) missing.push('university');

    if (missing.length > 0) {
      return res.status(404).json({
        error: `The following resource${missing.length > 1 ? 's' : ''} ${missing.join(' and ')} ${missing.length > 1 ? 'were' : 'was'} not found`
      });
    }

    const alreadyExists = await CourseUniversity.exists(course_id, university_id);
    if (alreadyExists) {
      return res.status(409).json({ error: 'This association already exists' });
    }

    // Esegui associazione
    await CourseUniversity.create(course_id, university_id);

    // Recupera nomi
    const courseName = await CourseUniversity.getCourseName(course_id);
    const universityName = await CourseUniversity.getUniversityName(university_id);

    res.status(201).json({
      message: `Course '${courseName}' (ID: ${course_id}) was successfully associated with University '${universityName}' (ID: ${university_id})`
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.remove = async (req, res) => {
  const { courseId, universityId } = req.params;
  try {
    const removed = await CourseUniversity.remove(courseId, universityId);
    if (!removed) {
      return res.status(404).json({ error: 'The target association doesn\'t exist' });
    }
    res.status(200).json({ message: 'The association has been succesfully eliminated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
