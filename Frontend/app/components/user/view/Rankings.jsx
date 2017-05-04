import React from 'react';
import { Table } from 'react-bootstrap';
import FlipMove from 'react-flip-move';

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
        let style = total.player._id === this.props.player._id ? 'highlight-row' : '';
        let row = (
          <tr key={total._id} className={style}>
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

    const flipitrealgood = {
      from: {
        transform: 'perspective(400px) rotate3d(1, 0, 0, 0deg)',
        opacity: 0
      },

      '20%': {
        opacity: 1
      },

      '40%': {
        transform: 'perspective(400px) rotate3d(1, 0, 0, 480deg)'

      },

      '90%': {
        transform: 'perspective(400px) rotate3d(1, 0, 0, 340deg)'
      },

      to: {
        transform: 'perspective(400px) rotate3d(1, 0, 0, 360deg)'
      }
    };

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
          <FlipMove
            duration={600}
            easing='ease-out'
            enterAnimation={flipitrealgood}
            staggerDurationBy={20}
            typeName='tbody'>
            {statRows}
          </FlipMove>
        </Table>
      </div>
    );
  }
}
