const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

exports.register = async (req, res) => {
  try {
    const { name, age, email, password } = req.body;
    
    const newUser = await User.create({
      name,
      age,
      email,
      password
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          age: newUser.age,
          email: newUser.email,
          role: newUser.role
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.guestLogin = async (req, res) => {
  try {
    const guestEmail = 'invitado@simulador-phet.app';

    // Buscar o crear el usuario invitado
    let guest = await User.findOne({ email: guestEmail });

    if (!guest) {
      guest = await User.create({
        name: 'Invitado',
        age: 0,
        email: guestEmail,
        password: Math.random().toString(36) + Math.random().toString(36),
        role: 'student'
      });
    }

    const token = signToken(guest._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: guest._id,
          name: guest.name,
          age: guest.age,
          email: guest.email,
          role: guest.role,
          isGuest: true
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Por favor proporcione email y contraseña'
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Email o contraseña incorrectos'
      });
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          age: user.age,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};
