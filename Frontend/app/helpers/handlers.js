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
