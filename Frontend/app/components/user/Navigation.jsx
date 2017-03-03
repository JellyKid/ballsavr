import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'JLS'
    };
  }

  render(){

    const adminLinks = this.props.admin ? (
      <NavDropdown title="Admin" id="admin-nav-links">
        <MenuItem onSelect={() => browserHistory.push('/invite')}>Invite New User</MenuItem>
        <MenuItem divider />
        <MenuItem onSelect={() => browserHistory.push('/tables/edit')}>Edit Collection</MenuItem>
      </NavDropdown>
    ) : "";

    const navbar = (
      <Navbar collapseOnSelect fixedTop inverse fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={() => browserHistory.push('/')}>LOGO</a>
          </Navbar.Brand>
          <Navbar.Brand>
            Welcome {this.props.initials}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem onSelect={() => browserHistory.push('/tables')}>Tables</NavItem>
            {adminLinks}
            <NavItem href='/api/logout' onSelect={() => window.location.replace('/api/logout')}>Log Out</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    return navbar;
  }
}

export default Navigation;
