import update from 'immutability-helper';
import { browserHistory } from 'react-router';
import {addErrorMsg, addSuccessMsg} from '../redux/actions';

export default function handleFetch(method, url, data, action) {
  var body, headers = {};
  if(data){
    if(data.tagName === 'FORM'){
      body = new FormData(data);
    } else {
      body = JSON.stringify(data);
      headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
    }
  }

  return fetch(
    url,
    {
      credentials: 'same-origin',
      method: method,
      body: body,
      headers: headers
    }
  ).then(
    (res) => {
      if(res.status === 401){ //if unauthorized return to login screen
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
      if(this && json.payload){
        return this.props.dispatch(action(json.payload));
      }
      return json;
    }
  ).catch(
    (err) => {
      if(err.message === "Unauthorized"){
        console.log("Unauthorized: redirecting to login screen");
        return {
          status: 401,
          message: err.message
        };
      } else {
        if(this){
          this.props.dispatch(addErrorMsg(`Error in GET response from ${url}, check logs for more info`));
        }
        console.error(`Error in GET response from ${url}`,err);
        return {
          status: 500,
          message: err
        };
      }
    }
  );
}
