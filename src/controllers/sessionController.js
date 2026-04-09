const Session = require('../models/Session');

// Registrar una nueva sesión (cuando un usuario inicia sesión)
exports.registrarSesion = async (req, res) => {
  try {
    const { userId, email, deviceInfo } = req.body;
    
    const newSession = await Session.create({
      userId,
      email,
      deviceInfo
    });

    res.status(201).json({
      status: 'success',
      data: {
        session: newSession
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Obtener todas las sesiones (para el panel de administrador)
exports.obtenerSesiones = async (req, res) => {
  try {
    const sessions = await Session.find()
      .sort({ loginTime: -1 })
      .populate('userId', 'name age email role');

    res.status(200).json({
      status: 'success',
      results: sessions.length,
      data: {
        sessions
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Obtener sesiones de un usuario específico
exports.obtenerSesionesPorUsuario = async (req, res) => {
  try {
    const { userId } = req.params;
    const sessions = await Session.find({ userId })
      .sort({ loginTime: -1 });

    res.status(200).json({
      status: 'success',
      results: sessions.length,
      data: {
        sessions
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
