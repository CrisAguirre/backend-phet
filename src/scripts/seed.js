const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Seed: Conexión establecida para la siembra de datos...');

    // Limpiar usuarios antiguos si es necesario (Opcional, pero para asegurar limpieza)
    // await User.deleteMany({});

    const users = [
      {
        email: 'invitado@phet.com',
        password: 'Ph3t@2026',
        role: 'student'
      },
      {
        email: 'admin@phet.com',
        password: 'Ph3t@#$2026',
        role: 'admin'
      }
    ];

    for (const u of users) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
        console.log(`Usuario creado: ${u.email}`);
      } else {
        console.log(`El usuario ya existe: ${u.email}`);
      }
    }

    console.log('Semillado finalizado exitosamente.');
    process.exit();
  } catch (error) {
    console.error('Error en el semillado:', error.message);
    process.exit(1);
  }
};

seedUsers();
