const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Permite que Vercel (y cualquier otro) acceda sin bloqueos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('API Backend del Simulador Phet funcionando.');
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
