import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button, Glyphicon, Image } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import topLogo from '../../assets/top_logo.png';

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
        <MenuItem onSelect={() => browserHistory.push('/users')}>Edit Users</MenuItem>
        <MenuItem divider />
        <MenuItem onSelect={() => browserHistory.push('/tables/edit')}>Edit Tables</MenuItem>
        <MenuItem divider />
        <MenuItem onSelect={() => browserHistory.push('/events')}>Events</MenuItem>
      </NavDropdown>
    ) : "";

    const navbar = (
      <Navbar collapseOnSelect fixedTop inverse fluid>
        <Navbar.Header>
          <Navbar.Brand>
            {/* <a onClick={() => browserHistory.push('/')}>LOGO</a> */}
            <a onClick={() => browserHistory.push('/')}>
              <Image src={topLogo} className='top-logo' />
            </a>
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
