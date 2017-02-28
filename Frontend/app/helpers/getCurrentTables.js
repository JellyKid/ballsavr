import update from 'immutability-helper';
import 'whatwg-fetch';
import { browserHistory } from 'react-router';

export default function getCurrentTables(){
  return fetch(
    '/api/currentTables',
    {
      credentials: 'same-origin'
    }
  ).then(
    (res) => {
      if(res.status === 401){
        window.location.pathname = '/';
        return {
          tables: [],
          error: res.statusText
        };
      }
      if(res.status === 200){
        return res.json().then(
          (json) => {

            return {
              tables: json
            };
          }
        );
      }
      return {
        error: `Error: ${res.status} ${res.statusText}`
      };
    }
  );
}
