const router = require('express').Router();
const apiRouterUser = require('./api/user.js');

router.use('/auth', apiRouterUser);

module.exports = router;
