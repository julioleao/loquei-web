import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  OverlayTrigger,
  Tooltip,
  Image,
  Popover,
  Col,
  Row,
} from 'react-bootstrap';
import { FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import logoutService from '../../services/logoutService';
import logo from '../../assets/logo.svg';
import user from '../../assets/user-placeholder.svg';
import './styles.css';

function Header() {
  const { isAuthenticated, name, email } = useSelector((state) => state.auth);
  const history = useHistory();
  const login = () => {
    let path = `/auth`;
    history.push(path);
  };
  const register = () => {
    let path = `/auth`;
    history.push(path);
  };
  const popover = (
    <Popover id='popover-basic'>
      <Popover.Title
        as='h3'
        style={{ justifyContent: 'center', display: 'flex' }}
      >
        {email}
      </Popover.Title>
      <Col>
        <Popover.Content>
          <Row style={{ paddingBottom: '8px' }}>
            <NavLink to='/profile' activeClassName='active'>
              <span>Meus anúncios</span>
            </NavLink>
          </Row>
          <Row>
            <NavLink to='/login' activeClassName='active'>
              <Button variant='outline-info' onClick={authLogoutButton}>
                Logout
                <FiLogIn size={15} />
              </Button>
            </NavLink>
          </Row>
        </Popover.Content>
      </Col>
    </Popover>
  );

  const dispatch = useDispatch();

  function authLogoutButton() {
    isAuthenticated && dispatch(logoutService());
  }
  return (
    <Navbar bg='light' expand='lg' variant='light'>
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
          <FormControl type='text' placeholder='Busca...' className='mr-sm-2' />
          <Button variant='outline-danger' style={{ marginRight: '8px' }}>
            Buscar
          </Button>
          {isAuthenticated ? (
            <OverlayTrigger
              trigger='click'
              placement='bottom'
              overlay={popover}
            >
              <Button
                variant='light'
                className='d-inline-flex align-items-center'
                style={{ marginLeft: '10px' }}
              >
                <Image
                  roundedCircle
                  src='https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'
                  style={{ width: '30px', height: '30px' }}
                />
                <span className='ml-1'>{name}</span>
              </Button>
            </OverlayTrigger>
          ) : (
            <div>
              <Button variant='outline-info' onClick={login}>
                Login
                <FiLogIn size={15} style={{ marginLeft: '6px' }} />
              </Button>
            </div>
          )}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
