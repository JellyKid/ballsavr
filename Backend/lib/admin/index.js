module.exports = {
  check: require('./mw/isAdmin'),
  deleteUser: require('./mw/deleteUser'),
  updateUser: require('./mw/updateUser'),
  syncTables: require('./mw/updateTablesFromIPDB'),
  addUser: require('./mw/addUser'),
  emailInvite: require('./mw/emailInvite')
};
