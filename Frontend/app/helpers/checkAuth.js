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
      console.log(res);
      if(res.status === 401){
        return this.setState({authenticated: false});
      }
      if(res.status === 200){
        return res.json().then(
          (json) => {
            console.log(json);
            return this.setState({authenticated: true});
          }
        );
      }
      return this.setState({alert: `Error: ${res.status} ${res.statusText}`});
    }
  );
}
