import { INITIAL_STATE } from './initialState';
import { SET_USER, SET_AUTH, SET_MESSAGE } from './actions';
import { setUser, setAuth, setMessage } from './pureFunc';

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    // case SOMEACTION:
    //   return someAction(state, action.payload);
    case SET_USER:
      return setUser(state, action.payload);
    case SET_AUTH:
      return setAuth(state, action.payload);
    case SET_MESSAGE:
      return setMessage(state, action.payload);
    default:
      return state;
  }
}
