import React from 'react';
import { Table } from 'react-bootstrap';

export default class Rankings extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){

    if(!this.props.totals || !this.props.players || !this.props.player){
      return null;
    }
    
    let rank = 0;
    let lastValue = 0;
    const statRows = this.props.totals
    .sort((a,b) => b.value - a.value)
    .map(
      (total) => {
        if(total.value != lastValue){rank++;}
        let row = (
          <tr key={total._id} className='flipitrealgood'>
            <td>{rank}</td>
            <td>{`${total.player.firstName} ${total.player.lastName.charAt(0)}`}</td>
            <td>{total.player.initials}</td>
            <td>{total.value}</td>
          </tr>
        );
        lastValue = total.value;
        return row;
      }
    );

    return (
      <div>
        <h2>Rankings</h2>
        <Table className='table-common' >
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Initials</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>{statRows}</tbody>
        </Table>
      </div>
    );
  }
}
