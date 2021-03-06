import { INITIAL_STATE } from './initialState';
import {SET_USER, SET_AUTH, SET_MESSAGE, ADD_ERROR_MSG,
        ADD_SUCCESS_MSG, ADD_INFO_MSG, CLEAR_MESSAGE,
        SET_CURRENT_TABLES, SET_USERS, CLEAR_ALL_MESSAGES,
        SET_EVENTS, SET_SITE_INFO, SET_CURRENT_ROUNDS} from './actions';
import {setUser, setUsers, setAuth, addMessage, clearMessage,
        setCurrentTables, clearAllMessages, setEvents, setSiteInfo,
        setCurrentRounds} from './pureFunc';

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    // case SOMEACTION:
    //   return someAction(state, action.payload);
    case SET_USER:
      return setUser(state, action.payload);
    case SET_USERS:
      return setUsers(state, action.payload);
    case SET_AUTH:
      return setAuth(state, action.payload);
    case ADD_ERROR_MSG:
      return addMessage(state, action.payload, "danger");
    case ADD_SUCCESS_MSG:
      return addMessage(state, action.payload, "success");
    case ADD_INFO_MSG:
      return addMessage(state, action.payload, "info");
    case CLEAR_MESSAGE:
      return clearMessage(state, action.payload);
    case CLEAR_ALL_MESSAGES:
      return clearAllMessages(state);
    case SET_CURRENT_TABLES:
      return setCurrentTables(state, action.payload);
    case SET_EVENTS:
      return setEvents(state, action.payload);
    case SET_SITE_INFO:
      return setSiteInfo(state, action.payload);
    case SET_CURRENT_ROUNDS:
      return setCurrentRounds(state, action.payload);
    default:
      return state;
  }
}
