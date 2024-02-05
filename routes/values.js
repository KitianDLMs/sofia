/*
    path: api/values
*/
const { Router } = require('express');
const { crearValue, getValues, getValue } = require('../controllers/values');

const router = Router();

router.post('/', crearValue );
router.get('/', getValues );
router.get('/:id', getValue );

module.exports = router;
