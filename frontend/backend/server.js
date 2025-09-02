const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend', time: new Date().toISOString() });
});

app.get('/api/todos', (req, res) => {
  res.json([{ id: 1, title: 'Aprender Next.js' }, { id: 2, title: 'Conectar Express' }]);
});

app.get('/api/ping-db', async (req, res) => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'db',
      user: process.env.DB_USER || 'appuser',
      password: process.env.DB_PASS || 'AppPass123',
      database: process.env.DB_NAME || 'appdb'
    });
    const [rows] = await conn.query('SELECT 1 AS ok');
    await conn.end();
    res.json({ db: 'ok', rows });
  } catch (e) {
    res.status(500).json({ db: 'error', message: e.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend escuchando en ${PORT}`));
