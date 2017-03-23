import React from 'react';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const panels = this.props.groupNames ?
      this.props.groupNames.map(
        (group) =>
          <Panel key={group} header={`Group ${group}`}>
            <ListGroup>
              {
                this.props.players
                .filter(
                  (player) => player.group === group
                ).map(
                  (player) => <ListGroupItem
                    key={player.user._id}>
                    {`${player.user.firstName} ${player.user.lastName}`}
                  </ListGroupItem>
                )
              }
            </ListGroup>
          </Panel>
      )
    : null;

    return <div>{panels}</div>;
  }
}

export default PlayerList;
