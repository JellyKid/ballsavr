import { browserHistory } from 'react-router';
import { addInfoMsg } from '../redux/actions';

export default function handleSubmit(e){
  e.preventDefault();
  this.setState({submitDisabled: true});
  return fetch(e.target.action, {
    method: 'POST',
    body: new FormData(e.target),
    credentials: 'same-origin'
  })
  .then((raw) => {
    return raw.json();
  })
  .then((res) => {    
    if(!res.status){
      console.error('ERROR: UNHANDLED RESULT');
      return this.setState({
        submitDisabled: false,
        alertMessage: 'ERROR: UNHANDLED RESULT'
      });
    }
    if(res.status !== 200){
      if(res.error){
        console.error(res.error);
      }
      return this.setState({
        submitDisabled: false,
        alertMessage: res.alert
      });
    }
    if(this.props.dispatch && res.message){
      this.props.dispatch(addInfoMsg(res.message));
    }
    res.redirect = res.redirect || '/'; //if not set, set it;
    return browserHistory.push(res.redirect);
  });
}
