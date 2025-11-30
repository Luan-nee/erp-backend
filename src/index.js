// server.js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev')); // visualizar el estado de las solicitudes al backend
app.use(cors()); // habilitar CORS para todas las solicitudes
app.use(express.json()); // para parsear cuerpos JSON
app.use(express.urlencoded({ extended: true })); // para parsear cuerpos URL-encoded

// Configuración de la conexión a MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'luan123',
  database: process.env.DB_NAME || 'erp_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Pool de conexiones
const pool = mysql.createPool(dbConfig);

// Middleware para verificar la conexión
app.use(async (req, res, next) => {
  try {
    req.db = await pool.getConnection();
    res.on('finish', () => {
      req.db.release();
    });
    console.log('Conexión a la base de datos establecida');
    next();
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    res.status(500).json({ error: 'Error de conexión a la base de datos' });
  }
});

app.get('/productos', async (req, res) => {
  try {
    const query = 'SELECT * FROM productos;';
    const [rows] = await req.db.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Endpoint para obtener la lista completa de colores
app.get('/colores', async (req, res) => {
  try {
    const query = 'SELECT * FROM colores;';
    const [rows] = await req.db.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener colores:', error);
    res.status(500).json({ error: 'Error al obtener colores' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
