const express = require('express');
const router = express.Router();
const controller = require('../controllers/universitiesController');

// Recupera tutte le università
router.get('/', controller.getAll);

// Crea una nuova università
router.post('/', controller.create);

// Crea più università in una volta
router.post('/bulk', controller.createBulk);

// Aggiorna il nome di un’università
router.put('/:id', controller.update);

// Elimina un’università
router.delete('/:id', controller.remove);

module.exports = router;
