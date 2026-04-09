const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

// GET - Obtener todos los usuarios (admin)
router.get('/users', protect, adminOnly, adminController.obtenerUsuarios);

// GET - Obtener un usuario por ID (admin)
router.get('/users/:id', protect, adminOnly, adminController.obtenerUsuario);

// DELETE - Eliminar un usuario (admin)
router.delete('/users/:id', protect, adminOnly, adminController.eliminarUsuario);

module.exports = router;
