import update from 'immutability-helper';
import 'whatwg-fetch';

export default function checkAuth(){
  return fetch(
    '/api/user/current',
    {
      credentials: 'same-origin'
    }
  ).then(
    (res) => {
        if(res.status !== 200){
        return {authenticated: false};
      }
      return res.json().then(
        (json) => {
          return {
            authenticated: true,
            user: json.user
          };
        }
      );
    }
  );
}
