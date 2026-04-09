const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const { protect, adminOnly } = require('../middleware/auth');

// POST - Registrar sesión (público, se llama al hacer login)
router.post('/', sessionController.registrarSesion);

// GET - Obtener todas las sesiones (solo admin)
router.get('/', protect, adminOnly, sessionController.obtenerSesiones);

// GET - Obtener sesiones de un usuario específico (solo admin)
router.get('/usuario/:userId', protect, adminOnly, sessionController.obtenerSesionesPorUsuario);

module.exports = router;
