import React from 'react';
import { ListGroup, ListGroupItem, Panel, Button } from 'react-bootstrap';

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    
    const panels = this.props.groupNames ?
      this.props.groupNames.map(
        (group) =>
          <Panel key={group} header={`Group ${group}`}>

            {
              this.props.players
              .filter(
                (player) => player.group === group
              ).map(
                (player) => <div key={player.user._id} className="token token-removable" tabIndex="0">
                  {`${player.user.firstName} ${player.user.lastName}`}
                  <span className="close-button" onClick={() => this.props.removePlayer(player.user._id)}>x</span>
                </div>
              )
            }

          </Panel>
      )
    : null;

    return <div>{panels}</div>;
  }
}

export default PlayerList;
