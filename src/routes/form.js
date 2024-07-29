const express = require('express');
const router = express.Router();
const { handleFormSave } = require('../controllers/formController');


// Endpoint para salvar o formulário
router.post('/save', handleFormSave);

module.exports = router;
