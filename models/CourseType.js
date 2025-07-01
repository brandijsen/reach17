const db = require('../db');

const CourseType = {
  async getAll() {
    const [rows] = await db.execute('SELECT * FROM course_types ORDER BY id ASC');
    return rows;
  },
    
  async findByName(name) {
    const [rows] = await db.execute('SELECT * FROM course_types WHERE name = ?', [name]);
    return rows[0];
  },

  async create(name) {
    const [result] = await db.execute('INSERT INTO course_types (name) VALUES (?)', [name]);
    return result.insertId;
  },

    async create(name) {
    const [result] = await db.execute('INSERT INTO course_types (name) VALUES (?)', [name]);
    return result.insertId;
  },

  async createBulk(names) {
  const inserted = [];
  const skipped = {
    empty: [],
    duplicate: []
  };

  for (let rawName of names) {
    const name = rawName?.trim();

    if (!name) {
      skipped.empty.push(rawName);
      continue;
    }

    const existing = await this.findByName(name);
    if (existing) {
      skipped.duplicate.push(name);
    } else {
      const id = await this.create(name);
      inserted.push({ id, name });
    }
  }

  return { inserted, skipped };
},

    async update(id, name) {
        const [result] = await db.execute('UPDATE course_types SET name = ? WHERE id = ?', [name, id]);
        return result.affectedRows > 0;
    },
    
 async remove(id) {
  const [result] = await db.execute('DELETE FROM course_types WHERE id = ?', [id]);
  return result.affectedRows; // restituisce 0 se non c'era nulla da eliminare
}


};

module.exports = CourseType;
