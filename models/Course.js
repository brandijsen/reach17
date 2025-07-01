const db = require('../db');

const Course = {
  async findByName(name) {
    const [rows] = await db.execute('SELECT * FROM courses WHERE name = ?', [name]);
    return rows[0];
  },

  async existsTypeId(typeId) {
    const [rows] = await db.execute('SELECT id FROM course_types WHERE id = ?', [typeId]);
    return rows.length > 0;
  },

  async create(name, typeId) {
    const [result] = await db.execute(
      'INSERT INTO courses (name, type_id) VALUES (?, ?)',
      [name, typeId]
    );
    return result.insertId;
  },

  async update(id, name, typeId) {
    const [result] = await db.execute(
      'UPDATE courses SET name = ?, type_id = ? WHERE id = ?',
      [name, typeId, id]
    );
    return result.affectedRows > 0;
  },

  async remove(id) {
    const [result] = await db.execute('DELETE FROM courses WHERE id = ?', [id]);
    return result.affectedRows;
  },

  
async findAll(filter = {}) {
  let { name, type, university } = filter;

  // Pulizia input: trim e lowercase
  name = name?.trim().toLowerCase();
  type = type?.trim().toLowerCase();
  university = university?.trim().toLowerCase();

  // Log di debug
  console.log('Filtro ricevuto:', { name, type, university });

  const courseParams = [];
  let courseQuery = `
    SELECT c.id AS course_id, c.name AS course_name, ct.name AS type_name
    FROM courses c
    JOIN course_types ct ON c.type_id = ct.id
    WHERE 1=1
  `;

  if (name) {
    courseQuery += ' AND LOWER(c.name) LIKE ?';
    courseParams.push(`%${name}%`);
  }

  if (type) {
    courseQuery += ' AND LOWER(ct.name) LIKE ?';
    courseParams.push(`%${type}%`);
  }

  const [courses] = await db.execute(courseQuery, courseParams);
  if (courses.length === 0) return [];

  // Prepara ID dei corsi per cercare le università associate
  const courseIds = courses.map(c => c.course_id);
  const placeholders = courseIds.map(() => '?').join(',');
  const universityParams = [...courseIds];

  const universityQuery = `
    SELECT cu.course_id, u.name AS university_name
    FROM course_university cu
    JOIN universities u ON cu.university_id = u.id
    WHERE cu.course_id IN (${placeholders})
  `;

  const [associations] = await db.execute(universityQuery, universityParams);

  // Mappa corso → array università (filtrata)
  const map = {};
  for (const row of associations) {
    const uni = row.university_name;

    if (university && !uni.toLowerCase().includes(university)) {
      continue;
    }

    if (!map[row.course_id]) {
      map[row.course_id] = [];
    }
    map[row.course_id].push(uni);
  }

  // Output finale
  return courses.map(course => ({
    id: course.course_id,
    course_name: course.course_name,
    type_name: course.type_name,
    universities: map[course.course_id] || []
  }));
}




};

module.exports = Course;
