import { INITIAL_STATE } from './initialState';
import { } from './actions';
import { } from './pureFunc';

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    // case SOMEACTION:
    //   return someAction(state, action.payload);

    default:
      return state;
  }
}
