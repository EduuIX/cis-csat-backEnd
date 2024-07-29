const express = require('express');
const { handleFormSave, calculateAverages } = require('../controllers/formController');

const router = express.Router();

router.post('/save', handleFormSave);
router.get('/averages', calculateAverages);

module.exports = router;