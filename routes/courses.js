const express = require('express');
const router = express.Router();
const controller = require('../controllers/coursesController');

router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/', controller.getAll);


module.exports = router;
