import update from 'react-addons-update';

export function setUser(state, user) {
  return update(state, {
    $set : {
      user: user,
      authenticated: true,
      admin: user.meta.admin
    }
  });
}

export function setAuth(state, auth) {
  return update(state, {
    $set : {
      authenticated: auth
    }
  });
}
