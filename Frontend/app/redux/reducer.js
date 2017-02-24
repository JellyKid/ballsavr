import { INITIAL_STATE } from './initialState';
import { SET_USER, SET_AUTH } from './actions';
import { setUser, setAuth } from './pureFunc';

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    // case SOMEACTION:
    //   return someAction(state, action.payload);
    case SET_USER:
      return setUser(state, action.payload);
    case SET_AUTH:
      return setAuth(state, action.payload);
    default:
      return state;
  }
}
