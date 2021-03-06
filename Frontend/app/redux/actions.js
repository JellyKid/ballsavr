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

export const CLEAR_ALL_MESSAGES = 'CLEAR_ALL_MESSAGES';
export function clearAllMessages() {
  return {
    type: CLEAR_ALL_MESSAGES
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

export const SET_EVENTS = 'SET_EVENTS';
export function setEvents(events) {
  return {
    type: SET_EVENTS,
    payload: events
  };
}

export const SET_SITE_INFO = 'SET_SITE_INFO';
export function setSiteInfo(info) {
  return {
    type: SET_SITE_INFO,
    payload: info
  };
}

export const SET_CURRENT_ROUNDS = 'SET_CURRENT_ROUNDS';
export function setCurrentRounds(rounds) {
  return {
    type: SET_CURRENT_ROUNDS,
    payload: rounds
  };
}
