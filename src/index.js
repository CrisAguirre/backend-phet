const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Prevent Railway edge from caching CORS responses
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  next();
});

// CORS configuration - allow all origins for now to test
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// Handle preflight
app.options(/.*/, (req, res) => {
  console.log('OPTIONS request received for:', req.path);
  console.log('Origin:', req.get('origin'));
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  console.log('CORS headers set');
  res.sendStatus(200);
});

app.use(express.json());
app.get('/', (req, res) => {
  res.send('API Backend del Simulador Phet funcionando.');
});

app.get('/cors-test', (req, res) => {
  res.json({ message: 'CORS test endpoint', headers: req.headers });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working', timestamp: new Date() });
});

// Importar rutas
app.use('/auth', require('./routes/authRoutes'));
app.use('/sessions', require('./routes/sessionRoutes'));
app.use('/evaluaciones', require('./routes/evaluationRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
