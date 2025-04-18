const express = require('express');
const router = express.Router();
const controller = require('../controllers/corsoAteneoController');

// Associa un corso a un ateneo
router.post('/', controller.associate);

router.put('/', controller.updateAssociation);


// Ottieni tutte le associazioni corso-ateneo
router.get('/', controller.getAssociations);

// Rimuovi una relazione corso-ateneo
router.delete('/:id_corso/:id_ateneo', controller.removeAssociation);

router.get('/:id_corso/:id_ateneo', controller.getById);
router.get('/corso/:id', controller.getByCorsoId); // tutte le associazioni per corso
router.get('/ateneo/:id', controller.getByAteneoId); // tutte per ateneo

module.exports = router;
