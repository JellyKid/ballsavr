export const SET_USER = 'SET_USER';
export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export const SET_AUTH = 'SET_AUTH';
export function setAuth(auth) {
  return {
    type: SET_AUTH,
    payload: auth
  };
}

export const ADD_ERROR_MSG = 'ADD_ERROR_MSG';
export function addErrorMsg(message) {
  return {
    type: ADD_ERROR_MSG,
    payload: message
  };
}

export const ADD_SUCCESS_MSG = 'ADD_SUCCESS_MSG';
export function addSuccessMsg(message) {
  return {
    type: ADD_SUCCESS_MSG,
    payload: message
  };
}

export const ADD_INFO_MSG = 'ADD_INFO_MSG';
export function addInfoMsg(message) {
  return {
    type: ADD_INFO_MSG,
    payload: message
  };
}

export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export function clearMessage(index) {
  return {
    type: CLEAR_MESSAGE,
    payload: index
  };
}

export const SET_CURRENT_TABLES = 'SET_CURRENT_TABLES';
export function setCurrentTables(tables) {
  return {
    type: SET_CURRENT_TABLES,
    payload: tables
  };
}

export const SET_USERS = 'SET_USERS';
export function setUsers(users) {
  return {
    type: SET_USERS,
    payload: users
  };
}
