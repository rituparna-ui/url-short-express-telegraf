const express = require('express');
const router = express.Router();

const homeControllers = require('./../controllers/home');

router.get('/', homeControllers.redirectFromHome);

router.get('/:short', homeControllers.shortParamControl);

module.exports = router;
