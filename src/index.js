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
  origin: 'https://simulador-phet-mp.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Manejar preflight explícitamente (importante para Angular)
// En Express 5, '*' fue removido. El nuevo estándar tipo regex es '/*' o '/(.*)'
app.options('/*', cors()); 

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
