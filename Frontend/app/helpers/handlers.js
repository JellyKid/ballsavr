import update from 'immutability-helper';
import { browserHistory } from 'react-router';

export function handleChange(e){
  this.setState(update(this.state, {
    form: {[e.target.name]: {$set: e.target.value}}
  }));
}
export function handleCheck(e){
  this.setState(update(this.state, {
    form: {[e.target.name]: {$set: e.target.checked}}
  }));
}
