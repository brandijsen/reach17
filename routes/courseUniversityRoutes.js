const express = require('express');
const router = express.Router();
const controller = require('../controllers/courseUniversityController');

router.get('/', controller.getAll); // ✅ nuova route

router.post('/', controller.create);
router.delete('/:courseId/:universityId', controller.remove);

module.exports = router;
