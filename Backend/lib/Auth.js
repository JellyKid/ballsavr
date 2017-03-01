const router = require('express').Router();
const parseForm = require('multer')().none();

const localStrategy = require('./auth/localStrategy');



router.use(localStrategy.initialize());
router.use(localStrategy.session());

router.post(
  '/login',
  parseForm,
  localStrategy.authenticate('local', {failureRedirect: '/'}),
  (req, res) => res.status(200).send({
    status: 200,
    message: "Welcome Back"
  })
);


module.exports = router;
