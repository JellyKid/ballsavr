import React from 'react';
import { Grid, Col, ListGroup, ListGroupItem, PageHeader, Alert, Button, Well, Pager } from 'react-bootstrap';
import handleGet from '../../helpers/handleGet';
import { setUsers } from '../../redux/actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import EditUserForm from './EditUserForm';
import FindUserTypeahead from './FindUserTypeahead';

class EditUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : null,
      maxUsersShown : 5,
      currentPage : 0
    };
    this.handleGet = handleGet.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  componentWillMount(){
    this.handleGet(
      '/api/admin/users',
      setUsers
    );
  }

  handlePrevious(){
    if(this.state.currentPage > 0){
      this.setState({currentPage: this.state.currentPage - 1});
    }
  }

  handleNext(){
    if(this.state.currentPage < Math.floor((this.props.users.length - 1) / this.state.maxUsersShown)){
      this.setState({currentPage: this.state.currentPage + 1});
    }
  }

  render(){
    const users = this.props.users
      .slice(
        this.state.currentPage * this.state.maxUsersShown,
        this.state.currentPage + this.state.maxUsersShown
      )
      .map(
      (user) => {
        return (
          <ListGroupItem
            header={`${user.lastName}, ${user.firstName}`}
            key={user._id}
            onClick={() => this.setState({user: user})}>
            {user.initials} - {user.email}
          </ListGroupItem>
        );
      }
    );

    const userList = (
      <div>
        <ListGroup className="mBottom">
          {users}
        </ListGroup>
        <Pager>
          <Pager.Item previous onSelect={this.handlePrevious}>&larr; Previous</Pager.Item>
          <Pager.Item next onSelect={this.handleNext}>Next &rarr;</Pager.Item>
        </Pager>
      </div>
    );

    const inviteUserButton = (
        <Button
          onClick={() => browserHistory.push('/invite')}
          className="mBottom"
          block
          bsSize='large'
          bsStyle="primary">Invite New User</Button>
    );

    const finduser = (
      <FindUserTypeahead
        users={this.props.users}
        setUser={(user) => this.setState({user: user})}
      />
    );

    const edit = (
      <div className="mBottom">
        {inviteUserButton}
        <hr />
        <div className="mBottom">{finduser}</div>
        {userList}
      </div>
    );

    const view = this.state.user ? ( //if user is selected show user edit page else show user list
      <Well>
        <EditUserForm user={this.state.user} closeEditor={() => this.setState({ user: null })}/>
      </Well>
    ) : edit;

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

function byName(a, b) {
  let nameA = a.lastName.toUpperCase() + a.firstName.toUpperCase();
  let nameB = b.lastName.toUpperCase() + b.firstName.toUpperCase();

  if (nameA < nameB){return -1;}
  if (nameA > nameB){return 1;}

  return 0;
}

function mapStateToProps(state) {
  return {
    users: state.users.sort(byName),
    admin: state.user.admin
  };
}

export default connect(mapStateToProps)(EditUsers);
