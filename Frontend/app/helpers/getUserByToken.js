import update from 'immutability-helper';
import { browserHistory } from 'react-router';

export default function getUserByToken(token) {
  return fetch(
    `/api/token?token=${token}`
  ).then((res) => {
    if(res.status === 200){
      return res.json();
    }
    return browserHistory.push('/');
    // return window.location.replace('/');
  }).then((json) => {
    this.setState(update(this.state, {
      form: {
        firstName: {$set: json.firstName},
        lastName: {$set: json.lastName},
        email: {$set: json.email},
        token: {$set: token}
      }
    }));
  });
}
