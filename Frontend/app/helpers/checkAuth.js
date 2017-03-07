import update from 'immutability-helper';
// import 'whatwg-fetch';

export default function checkAuth(){
  return fetch(
    '/api/currentuser',
    {
      credentials: 'same-origin'
    }
  ).then(
    (res) => {
      console.log(res);
      if(res.status > 299){
        return {authenticated: false};
      }
      if(res.status === 202){
        return {
          authenticated:false,
          firstUser: true
        };
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
