import update from 'immutability-helper';
import 'whatwg-fetch';

export default function checkAuth(){
  return fetch(
    '/api/checkAuth',
    {
      credentials: 'same-origin'
    }
  ).then(
    (res) => {

      if(res.status === 401){
        // return this.setState({authenticated: false});
        return {authenticated: false};
      }
      if(res.status === 200){
        return res.json().then(
          (json) => {            
            // return this.setState({authenticated: true});
            return {
              authenticated: true,
              user: json
            };
          }
        );
      }
      // return this.setState({error: `Error: ${res.status} ${res.statusText}`});
      return {
        authenticated: false,
        error: `Error: ${res.status} ${res.statusText}`
      };
    }
  );
}
