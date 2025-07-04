const db = require('../db');

const University = {
  async getAll() {
    const [rows] = await db.execute('SELECT * FROM universities ORDER BY id ASC');
    return rows;
  },

  async getById(id) {
  const [rows] = await db.execute('SELECT id, name FROM universities WHERE id = ?', [id]);
  return rows[0] || null;
},

  async findByName(name) {
    const [rows] = await db.execute('SELECT * FROM universities WHERE name = ?', [name]);
    return rows[0];
  },

  async create(name) {
    const [result] = await db.execute('INSERT INTO universities (name) VALUES (?)', [name]);
    return result.insertId;
  },

  async createBulk(names) {
    const inserted = [];
    const skipped = { empty: [], duplicate: [] };

    for (let rawName of names) {
      const name = rawName?.trim();

      if (!name) {
        skipped.empty.push(rawName);
        continue;
      }

      const exists = await this.findByName(name);
      if (exists) {
        skipped.duplicate.push(name);
      } else {
        const id = await this.create(name);
        inserted.push({ id, name });
      }
    }

    return { inserted, skipped };
  },

  async update(id, name) {
    const [result] = await db.execute('UPDATE universities SET name = ? WHERE id = ?', [name, id]);
    return result.affectedRows > 0;
  },

  async remove(id) {
    const [result] = await db.execute('DELETE FROM universities WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = University;
