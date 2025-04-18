const express = require('express');
const router = express.Router();
const controller = require('../controllers/ateneoController');

// Ottieni tutti gli atenei
router.get('/', controller.getAll);

// Ottieni un ateneo per ID
router.get('/:id', controller.getById);

// Crea un nuovo ateneo
router.post('/', controller.create);

// Modifica un ateneo
router.put('/:id', controller.update);

// Elimina un ateneo
router.delete('/:id', controller.remove);

module.exports = router;
