import React from 'react';
const socket = require('socket.io-client')('/round',{
  path: '/api/socket.io',
  autoConnect: false
});

export default class RoundViewSocket extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount(){
    socket.open();
    socket.on(
      'connect',
      () => socket.emit('join round', this.props.round)
    );
    socket.on(
      'rankings',
      this.props.setRankings      
    );
    socket.on(
      'connect_error',
      () => setTimeout(socket.open, 1000)
    );
  }

  componentWillUnmount(){
    socket.close();
  }

  render(){
    return null;
  }
}
