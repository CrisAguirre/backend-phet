const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
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
  origin: 'https://simulador-phet-mp.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Preflight handler compatible con Express 5
app.options(/.*/, cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Backend del Simulador Phet funcionando.');
});

// Rutas
app.use('/auth', require('./routes/authRoutes'));
app.use('/sessions', require('./routes/sessionRoutes'));
app.use('/evaluaciones', require('./routes/evaluationRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});