import update from 'immutability-helper';

export function setUser(state, user) {
  return update(state, {
    $merge : {
      user: user,
      authenticated: true,
      admin: user.admin
    }
  });
}

export function setUsers(state, users) {
  return update(state, {
    users : {
      $set : users
    }
  });
}

export function setAuth(state, auth) {
  return update(state, {
    $merge : {
      authenticated: auth
    }
  });
}

export function addMessage(state, message, style) {
  return update(
    state,
    {
      messageBox: {
        visible : {
          $push: [{
            text: message,
            style: style
          }]
        },
        log : {
          $push: [{
            message: message
          }]
        }
      }
    }
  );
}

export function clearMessage(state, index) {
  return update(
    state,
    {
      messageBox: {
        visible: {
          $splice : [[index, 1]]
        }
      }
    }
  );
}

export function setCurrentTables(state, tables) {
  return update(
    state,
    {
      currentTables: {
        $set : tables
      }
    }
  );
}
