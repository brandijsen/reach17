const db = require('../db');

const CourseUniversity = {
  async create(courseId, universityId) {
    await db.execute(
      'INSERT INTO course_university (course_id, university_id) VALUES (?, ?)',
      [courseId, universityId]
    );
  },

  async remove(courseId, universityId) {
    const [result] = await db.execute(
      'DELETE FROM course_university WHERE course_id = ? AND university_id = ?',
      [courseId, universityId]
    );
    return result.affectedRows > 0;
  }
};

module.exports = CourseUniversity;
