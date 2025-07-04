const db = require('../db');

const CourseUniversity = {

async getAll() {
  const [rows] = await db.execute(`
    SELECT 
      cu.course_id,
      c.name AS course_name,
      cu.university_id,
      u.name AS university_name
    FROM course_university cu
    JOIN courses c ON cu.course_id = c.id
    JOIN universities u ON cu.university_id = u.id
    ORDER BY cu.course_id, cu.university_id
  `);
  return rows;
},

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
  },


  async getCourseName(courseId) {
  const [rows] = await db.execute('SELECT name FROM courses WHERE id = ?', [courseId]);
  return rows[0]?.name || null;
},

async getUniversityName(universityId) {
  const [rows] = await db.execute('SELECT name FROM universities WHERE id = ?', [universityId]);
  return rows[0]?.name || null;
},

  async exists(courseId, universityId) {
    const [rows] = await db.execute(
      'SELECT 1 FROM course_university WHERE course_id = ? AND university_id = ?',
      [courseId, universityId]
    );
    return rows.length > 0;
  },

  async courseExists(courseId) {
    const [rows] = await db.execute('SELECT id FROM courses WHERE id = ?', [courseId]);
    return rows.length > 0;
  },

  async universityExists(universityId) {
    const [rows] = await db.execute('SELECT id FROM universities WHERE id = ?', [universityId]);
    return rows.length > 0;
  }
};

module.exports = CourseUniversity;

