// const getCurrentUser = require('./db/getCurrentUser');
// const isAdmin = require('./auth/isAdmin');
// const inviteUser = require('./admin/inviteUser');
// const deleteUser = require('./admin/deleteUser');
// const updateTablesFromIPDB = require('./admin/updateTablesFromIPDB');
// const getUsers = require('./db/getUsers');
// const parseUpdates = require('./user/parseUpdates');
// const updateUser = require('./db/updateUser');

module.exports = {
  check: require('./mw/isAdmin'),
  deleteUser: require('./mw/deleteUser'),
  updateUser: require('./mw/updateUser'),
  inviteUser: require('./mw/inviteUser')
};
