import React from 'react';
import {Label, ProgressBar} from 'react-bootstrap';

export default class Manage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    if(!this.props.round || !this.props.player || !this.props.player.admin){
      return null;
    }

    const roundProgress = (
      <div>
        <h3>Round <Label>{this.props.round.progress}%</Label> Complete</h3>
        <ProgressBar striped bsStyle="info" now={this.props.round.progress}/>
      </div>
    );

    return (
      <div>
        <h2>Manage</h2>
        {roundProgress}
      </div>
    );
  }
}
