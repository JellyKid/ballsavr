import update from 'immutability-helper';
import { browserHistory } from 'react-router';
import {addErrorMsg, addSuccessMsg} from '../redux/actions';

export default function handlePost(url,data,action) {
  var body, headers;
  if(data.tagName === 'FORM'){
    body = new FormData(data);
    headers = {};
  } else {
    body = JSON.stringify(data);
    headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }
  return fetch(
    url,
    {
      credentials: 'same-origin',
      method: "POST",
      body: body,
      headers: headers
    }
  ).then(
    (res) => {
      if(res.status === 401){ //if unauthorized return to login screen
        browserHistory.push('/login');
        throw new Error(res.statusText);
      }
      if(res.status >= 300){
        console.error(res.status,res.statusText);
      }
      return res.text();
    }
  ).then(
    (text) => {
      try {
        let json = JSON.parse(text); //test if json
        return json;
      } catch (e) {
        return {error: String(text).substr(0,100)};
      }
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
        this.props.dispatch(action(json.payload));
      }
      return json;
    }
  ).catch(
    (err) => {
      console.error(`Details: ${err}`);
      this.props.dispatch(addErrorMsg(String(err).substr(0,100)));
      return {error: String(err).substr(0,100)};      
    }
  );
}
