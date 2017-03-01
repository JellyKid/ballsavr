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

export function setMessage(state, message) {
  return update(state, {
    $merge : {
      message: message
    }
  });
}
