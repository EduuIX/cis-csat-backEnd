const express = require('express');
const { handleFormSave, calculateAverages, calculateOverallAverage } = require('../controllers/formController');

const router = express.Router();

router.post('/save', handleFormSave);
router.get('/averages', calculateAverages);
router.get('/overall-average', calculateOverallAverage);

module.exports = router;
