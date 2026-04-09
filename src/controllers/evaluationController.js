const Evaluation = require('../models/Evaluation');

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
