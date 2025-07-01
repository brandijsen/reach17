const express = require('express');
const router = express.Router();
const controller = require('../controllers/typesController');

router.get('/', controller.getAll); // <-- DEVE esserci questa riga
router.post('/', controller.create);
router.post('/bulk', controller.createBulk);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
