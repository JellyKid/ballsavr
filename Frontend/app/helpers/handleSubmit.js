import update from 'immutability-helper';
import { browserHistory } from 'react-router';
import {addErrorMsg, addSuccessMsg} from '../redux/actions';

export default function handleSubmit(url,form,action) {
  return fetch(
    url,
    {
      credentials: 'same-origin',
      method: "POST",
      body: new FormData(form)
    }
  ).then(
    (res) => {
      if(res.status === 401){ //if unauthorized return to login screen
        window.location.replace('/');
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
        return this.props.dispatch(action(json.payload));
      }
      return json;
    }
  ).catch(
    (err) => {
      if(this){
        this.props.dispatch(addErrorMsg(`Error in POST response from ${url}, check logs for more info`));
      }
      console.error(`Error in POST response from ${url}`,err);
      return {error: String(err).substr(0,100)};
    }
  );
}
