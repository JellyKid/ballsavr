import update from 'immutability-helper';

export function setUser(state, user) {
  return update(state, {
    $merge : {
      user: user,
      authenticated: true,
      admin: user.meta.admin
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
