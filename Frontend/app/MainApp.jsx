import React from 'react';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentWillMount(){
  //   return this.checkAuth().then((res) => {
  //     if(res.authenticated && res.user){
  //       return this.props.dispatch(setUser(res.user));
  //     }
  //     return this.props.dispatch(setAuth(false));
  //   });
  // }

  render(){
        return (this.props.children);
  }
}

export default MainApp;
