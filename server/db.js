import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initDb();
  }
});

function initDb() {
  db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )`);

    // Images table
    db.run(`CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT,
      description TEXT,
      resolution TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Seed default admin if not exists
    const adminUser = 'admin';
    const adminPass = 'Maico2026!'; // User should change this
    
    db.get('SELECT * FROM users WHERE username = ?', [adminUser], (err, row) => {
      if (!row) {
        const hashedPassword = bcrypt.hashSync(adminPass, 10);
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [adminUser, hashedPassword], (err) => {
          if (err) console.error('Error seeding admin user:', err.message);
          else console.log('Default admin user created.');
        });
      }
    });
  });
}

export default db;
