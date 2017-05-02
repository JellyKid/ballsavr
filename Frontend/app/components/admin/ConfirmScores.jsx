import React from 'react';
import { Table, PageHeader, Button, Col, Modal } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import handleFetch from '../../helpers/handleFetch';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDisabled : false
    };
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm(){
    this.setState({confirmDisabled: true});
    handleFetch('GET', `/api/score/confirm/${this.props.score._id}`)
    .then(
      () => this.setState({confirmDisabled: false}, this.props.hideMe)
    );
  }

  render(){
    if(!this.props.score){
      return null;
    }

    const body = `${this.props.score.table.name} - ${this.props.score.player.firstName} ${this.props.score.player.lastName}`;

    return (
      <Modal backdrop={false} show={this.props.visible}>
        <Modal.Body>
          <h2>Confirm score?</h2>
          <h2><NumberFormat value={this.props.score.value} displayType="text" thousandSeparator={true}/><br/> <small>{body}</small></h2>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleConfirm} disabled={this.state.confirmDisabled} block bsStyle="danger">Confirm</Button>
          <Button block onClick={this.props.hideMe}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default class ConfirmScores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score : null
    };
  }
  render(){

    if(!this.props.scores){
      return null;
    }

    const filtered = this.props.scores
    .filter(
      (score) => score.confirmed === false && score.player._id !== this.props.player._id
    );

    if(filtered.length === 0){
      return (
        <div>
          <h2>Approve</h2>
          <p>No scores awaiting approval!</p>
        </div>
      );
    }

    const scores = filtered
    .sort((a,b) => a.meta.updatedAt - b.meta.updatedAt)
    .map(
      (score) => {
        const approveButton = (
          <Button bsStyle="danger" onClick={() => this.setState({score: score})}>Approve</Button>
        );
        return (
          <tr key={score._id}>
            <td>{`${score.player.firstName} ${score.player.lastName.charAt(0)}`}</td>
            <td>{score.table.name}</td>
            <td><NumberFormat value={score.value} displayType="text" thousandSeparator={true}/></td>
            <td>{approveButton}</td>
          </tr>
        );
      }
    );


    const popup = <Popup visible={this.state.score ? true : false} score={this.state.score} hideMe={() => this.setState({score: null})}/>;

    return (
      <div>
        {popup}
        <h2>Approve</h2>
        <Table striped style={{background: '#fff'}}>
          <thead>
            <tr>
              <th>Player</th>
              <th>Table</th>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{scores}</tbody>
        </Table>
      </div>
    );
  }
}
