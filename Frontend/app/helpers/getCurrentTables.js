import update from 'immutability-helper';
import 'whatwg-fetch';
import { browserHistory } from 'react-router';

export default function getCurrentTables(){
  return fetch(
    '/api/table/current',
    {
      credentials: 'same-origin'
    }
  ).then(
    (raw) => raw.json()
  ).then(
    (res) => {
      if(!res){
        console.log("UNHANDLED RESPONSE");
        return ({alertMessage:"UNHANDLED RESPONSE"});
      }
      if(res.status === 401){
        window.location.replace('/');
      }
      if(res.status === 200 && res.payload){
        return {
          tables: res.payload
        };
      }
      res.error = res.error || "NO ERROR RETURNED";
      return {
        alertMessage: `Error: ${res.error}`
      };
    }
  );
}
