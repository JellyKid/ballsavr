import React from 'react';
import { Button, Table, Glyphicon, Col, Clearfix } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import SubmitScoreModal from './SubmitScoreModal';

export default class Scores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitModal: {
        data: null,
        show: false
      }
    };
    this.hideSubmitModal = this.hideSubmitModal.bind(this);
  }

  hideSubmitModal(){
    this.setState({
      submitModal: {
        data: null,
        show: false
      }
    });
  }

  render(){
    if(!this.props.player || !this.props.scores || !this.props.round){
      return null;
    }

    const tables = this.props.round.tables.map(
      (table) => {
        let match = this.props.scores.find(
          (score) => score.table._id == table._id && score.player._id == this.props.player._id
        );

        let buttonContent = match ?
          <NumberFormat
            value={match.value}
            displayType={"text"}
            thousandSeparator={true}
          /> :
          <div><Glyphicon glyph="camera" /> submit</div>;



        let buttonStyle = !match ? 'default' : match.confirmed ? 'success' : 'danger';

        const submitButton = (
          <Button
            onClick={() => this.setState({
              submitModal: {
                data: {
                  table: table,
                  player: this.props.player,
                  group: this.props.group,
                  round: this.props.round,
                  score: match ? match.value : 0
                },
                show: true
              }
            })}
            bsStyle={buttonStyle}
            bsSize="small">
            {buttonContent}
          </Button>
        );

        let points = match ? match.points : 0;

        return (
          <tr key={table._id} >
            <td>{table.name}</td>
            <td>{points}</td>
            <td>{submitButton}</td>
          </tr>
        );}
    );

    const scoresLegend = (
      <div>
        <Col xs={1}><div className='red-block'></div></Col>
        <Col xs={4}> Unconfirmed</Col>
        <Col xs={1}><div className='green-block'></div></Col>
        <Col xs={4}> Confirmed</Col>
      </div>
    );

    return (
      <div>
        <SubmitScoreModal
          visible={this.state.submitModal.show}
          data={this.state.submitModal.data}
          hideMe={this.hideSubmitModal}
        />
        <h2>{this.props.player.initials} Scores</h2>
        <Table striped className='table-common'>
          <thead>
            <tr>
              <th>Table</th>
              <th>Points</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{tables}</tbody>
        </Table>
        {scoresLegend}
        <Clearfix/>
      </div>
    );
  }
}
