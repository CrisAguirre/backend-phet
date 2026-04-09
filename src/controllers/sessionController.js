const Session = require('../models/Session');

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
