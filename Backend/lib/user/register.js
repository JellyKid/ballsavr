const router = require('express').Router();
const getUserByToken = require('../../db/middleware/getUserByToken');

router.get(
  '/register',
  getUserByToken,
  (req, res) => res.redirect('/')
);

module.exports = router;
