import update from 'immutability-helper';
import { browserHistory } from 'react-router';
import {addErrorMsg, addSuccessMsg} from '../redux/actions';

export default function handleGet(url,action, secondaryMethod) {
  return fetch(
    url,
    {
      credentials: 'same-origin',
      method: secondaryMethod || 'GET'
    }
  ).then(
    (res) => {
      if(res.status === 401){ //if unauthorized return to login screen
        window.location.replace('/login');
        throw new Error(res.statusText);
      }
      if(res.status !== 200){
        console.error(res.status,res.statusText);
      }
      return res.json();
    }
  ).then(
    (json) => {
      if(json.error){
        throw new Error(json.error);
      }
      if(this && json.message){
        this.props.dispatch(addSuccessMsg(json.message));
      }
      if(this && json.payload){
        return this.props.dispatch(action(json.payload));
      }
      return json;
    }
  ).catch(
    (err) => {
      if(this){
        this.props.dispatch(addErrorMsg(`Error in GET response from ${url}, check logs for more info`));
      }
      return console.error(`Error in GET response from ${url}`,err);
    }
  );
}
