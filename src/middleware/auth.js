const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rutas (verificar JWT)
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Verificar si el token fue enviado en el header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No estás autenticado. Por favor inicia sesión.'
      });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar que el usuario aún exista
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'error',
        message: 'El usuario perteneciente a este token ya no existe.'
      });
    }

    // Adjuntar el usuario al request (sin la contraseña)
    req.user = {
      _id: currentUser._id,
      email: currentUser.email,
      role: currentUser.role,
      createdAt: currentUser.createdAt
    };
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Token inválido o expirado.'
    });
  }
};

// Middleware para verificar el rol de administrador
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'No tienes permisos de administrador para acceder a este recurso.'
    });
  }
  next();
};
