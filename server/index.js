import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5000;
const SECRET_KEY = 'maico_maceira_secret_2026';

app.use(cors());
app.use(express.json());

// Setup storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ message: 'Token no proporcionado' });

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Token inválido' });
    req.userId = decoded.id;
    next();
  });
};

// Auth Endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) return res.status(500).send({ message: 'Error en el servidor' });
    if (!user) return res.status(404).send({ message: 'Usuario no encontrado' });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 }); // 24h
    res.status(200).send({ auth: true, token });
  });
});

// Image Endpoints
app.get('/api/images', (req, res) => {
  db.all('SELECT * FROM images ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).send({ message: 'Error al obtener imágenes' });
    res.status(200).json(rows);
  });
});

app.post('/api/images/upload', verifyToken, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).send({ message: 'No se subió ninguna imagen' });

  const { description, resolution } = req.body;
  const filename = req.file.filename;

  db.run(
    'INSERT INTO images (filename, description, resolution) VALUES (?, ?, ?)',
    [filename, description, resolution],
    function(err) {
      if (err) return res.status(500).send({ message: 'Error al guardar en el servidor' });
      res.status(200).send({ id: this.lastID, filename, description, resolution });
    }
  );
});

app.delete('/api/images/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    db.get('SELECT filename FROM images WHERE id = ?', [id], (err, row) => {
        if (row) {
            // Option to delete file here if needed (fs.unlink)
            db.run('DELETE FROM images WHERE id = ?', [id], (err) => {
                if (err) return res.status(500).send({ message: 'Error al eliminar' });
                res.status(200).send({ message: 'Imagen eliminada' });
            });
        } else {
            res.status(404).send({ message: 'No encontrada' });
        }
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
