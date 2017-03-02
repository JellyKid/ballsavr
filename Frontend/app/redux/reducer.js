import { INITIAL_STATE } from './initialState';
import {SET_USER, SET_AUTH, SET_MESSAGE, ADD_ERROR_MSG,
        ADD_SUCCESS_MSG, ADD_INFO_MSG, CLEAR_MESSAGE } from './actions';
import {setUser, setAuth, addMessage, clearMessage } from './pureFunc';

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    // case SOMEACTION:
    //   return someAction(state, action.payload);
    case SET_USER:
      return setUser(state, action.payload);
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
    default:
      return state;
  }
}
