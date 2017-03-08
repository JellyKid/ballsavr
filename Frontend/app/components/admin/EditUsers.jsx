import React from 'react';
import { Grid, Col, ListGroup, ListGroupItem, PageHeader, Alert, Button, Well } from 'react-bootstrap';
import handleGet from '../../helpers/handleGet';
import { setUsers } from '../../redux/actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import EditUserForm from './EditUserForm';

class EditUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : null
    };
    this.handleGet = handleGet.bind(this);
  }

  componentWillMount(){
    this.handleGet(
      '/api/admin/users',
      setUsers
    );
  }

  render(){
    const users = this.props.users.map(
      (user) => {
        return (
          <ListGroupItem
            header={user.firstName}
            key={user._id}
            onClick={() => this.setState({user: user})}>
            {user.lastName} - {user.initials}
          </ListGroupItem>
        );
      }
    );

    const view = this.state.user ? ( //if user is selected show user edit page else show user list
      <Well>
        <EditUserForm user={this.state.user} closeEditor={() => this.setState({ user: null })}/>
      </Well>
    ) : <ListGroup>{users}</ListGroup>;

    return(
      <Grid>
        <Col sm={8} smOffset={2}>
          <PageHeader>Edit Users</PageHeader>
          {view}
        </Col>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    admin: state.user.admin
  };
}

export default connect(mapStateToProps)(EditUsers);
