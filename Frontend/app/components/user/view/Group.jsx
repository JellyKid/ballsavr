import React from 'react';

export default class Group extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    if(!this.props.group || !this.props.players){
      return null;
    }

    const playerTokens = this.props.players.reduce((p, c) => {
      if(c.group === this.props.group){
        p.push(
          <div key={c._id} className="group-player-token">{`${c.user.firstName} ${c.user.lastName.charAt(0)}`}</div>
        );
      }
      return p;
    }, []);

    return (
      <div>
        <h2>{`Your Group - ${this.props.group}`}</h2>
        {playerTokens}
      </div>
    );
  }
}
