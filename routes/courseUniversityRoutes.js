const express = require('express');
const router = express.Router();
const controller = require('../controllers/courseUniversityController');

router.post('/:courseId/:universityId', controller.create);
router.delete('/:courseId/:universityId', controller.remove);

module.exports = router;
