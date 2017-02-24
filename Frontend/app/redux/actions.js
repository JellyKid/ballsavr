export const SET_USER = 'SET_USER';
export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export const SET_AUTH = 'SET_USET_AUTHSER';
export function setAuth(auth) {
  return {
    type: SET_AUTH,
    payload: auth
  };
}
