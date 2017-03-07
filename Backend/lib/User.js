const router = require('express').Router();

const checkAuth = require('./auth/checkAuth');
const logout = require('./auth/logout');
const login = require('./auth/login');

const noUsersCheck = require('./user/noUsersCheck');
const getCurrentUserDB = require('./db/getCurrentUser');
const getUserByToken = require('./db/getUserByToken');

const register = require('./user/register');

function formatFirstName(firstName) {
  return firstName.toLowerCase()
          .replace(
            /^[a-z]/,
            (match) => match.toUpperCase()
          );
}


router.all(
  '/user/*',
  noUsersCheck,
  checkAuth
);

router.get(
  '/user/current',
  getCurrentUserDB,
  (req,res) => res.status(200).send({
    status: 200,
    user: res.locals.currentUser
  })
);

// router.get(
//   '/logout',
//   logout,
//   (req,res) => res.redirect('/')
// );
//
// router.get(
//   '/token',
//   getUserByToken,
//   (req, res) => res.status(200).send(res.locals.user)
// );
//
// router.post(
//   '/register',
//   register,
//   login,
//   (req,res) => res.status(200).send({
//     status: 200,
//     message: `Welcome ${formatFirstName(res.locals.user.firstName)} to Tricity Pinball!`
//   })
// );


module.exports = router;
