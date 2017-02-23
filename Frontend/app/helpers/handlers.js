import update from 'immutability-helper';
import 'whatwg-fetch';

export function handleChange(e){
  this.setState(update(this.state, {
    form: {[e.target.name]: {$set: e.target.value}}
  }));
}
export function handleCheck(e){
  this.setState(update(this.state, {
    form: {[e.target.name]: {$set: e.target.checked}}
  }));
}
export function handleSubmit(e){
  e.preventDefault();
  this.setState({submitDisabled: true});
  return fetch(e.target.action, {
    method: 'POST',
    body: new FormData(e.target)
  }).then((res) => {
    if(res.status === 200){
      return window.location.replace(res.url);
    }
    return res.text();
  }).then((message) => {
    this.setState({
      submitDisabled: false,
      alertMessage: message
    });
  });
}

export function getUserByToken(token) {
  return fetch(
    `/api/register?token=${token}`
  ).then((res) => {
    if(res.status === 200){
      return res.json();
    }
    return window.location.replace('/');
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
