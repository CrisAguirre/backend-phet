const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');
const { protect, adminOnly } = require('../middleware/auth');

// POST - Guardar evaluación (público)
router.post('/', evaluationController.guardarEvaluacion);

// GET - Obtener todas las evaluaciones (solo admin)
router.get('/', protect, adminOnly, evaluationController.obtenerEvaluaciones);

// GET - Obtener estadísticas de evaluaciones (solo admin)
router.get('/stats', protect, adminOnly, evaluationController.obtenerEstadisticas);

// GET - Obtener evaluaciones de un usuario específico (solo admin)
router.get('/usuario/:userId', protect, adminOnly, evaluationController.obtenerEvaluacionesPorUsuario);

module.exports = router;
