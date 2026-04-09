const Evaluation = require('../models/Evaluation');

// Guardar una nueva evaluación
exports.guardarEvaluacion = async (req, res) => {
  try {
    const { userId, email, taller, score, totalQuestions, results } = req.body;

    const newEvaluation = await Evaluation.create({
      userId,
      email,
      taller,
      score,
      totalQuestions,
      results
    });

    res.status(201).json({
      status: 'success',
      data: {
        evaluation: newEvaluation
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Obtener todas las evaluaciones (para el panel de administrador)
exports.obtenerEvaluaciones = async (req, res) => {
  try {
    const evaluations = await Evaluation.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name age email role');

    res.status(200).json({
      status: 'success',
      results: evaluations.length,
      data: {
        evaluaciones: evaluations
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Obtener evaluaciones de un usuario específico
exports.obtenerEvaluacionesPorUsuario = async (req, res) => {
  try {
    const { userId } = req.params;
    const evaluations = await Evaluation.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: evaluations.length,
      data: {
        evaluations
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Obtener estadísticas generales de evaluaciones
exports.obtenerEstadisticas = async (req, res) => {
  try {
    const stats = await Evaluation.aggregate([
      {
        $group: {
          _id: '$taller',
          totalEvaluaciones: { $sum: 1 },
          promedioScore: { $avg: '$score' },
          maxScore: { $max: '$score' },
          minScore: { $min: '$score' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const totalEvaluaciones = await Evaluation.countDocuments();

    res.status(200).json({
      status: 'success',
      data: {
        totalEvaluaciones,
        porTaller: stats
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};