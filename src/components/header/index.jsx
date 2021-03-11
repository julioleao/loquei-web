import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

function Header() {
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand>
        <Link to='/'>
          <img src={logo} alt='Loquei' />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/list'>
            Mapa
          </Nav.Link>

          <Nav.Link as={Link} to='/create'>
            Divulgar
          </Nav.Link>
          <NavDropdown title='Alugar' id='basic-nav-dropdown'>
            <NavDropdown.Item>Casa</NavDropdown.Item>
            <NavDropdown.Item>Apartamento</NavDropdown.Item>
            <NavDropdown.Item>Quitinete</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Outros</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl
            type='text'
            placeholder='Buscar...'
            className='mr-sm-2'
          />
          <Button variant='outline-danger'>Buscar</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
