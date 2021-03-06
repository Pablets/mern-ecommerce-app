import React, { useRef, useState } from 'react';
import { Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
// import Dropdown from 'react-overlays/Dropdown';
import useRootClose from 'react-overlays/useRootClose';

const Header = () => {
  const dispatch = useDispatch();

  const isDesktop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  });

  const ref = useRef();
  const [show, setShow] = useState(false);
  const handleRootClose = () => setShow(false);

  useRootClose(ref, handleRootClose, {
    disabled: !show,
  });

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    setShow(false);
  };

  return (
    <>
      {!isDesktop ? (
        <header style={{ marginTop: '69px' }}>
          <Navbar
            className="d-flex align-items-center py-3 acenter fixed-top"
            bg="dark"
            variant="dark"
            expand="lg"
            collapseOnSelect
          >
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand href="/">ProShop</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle
                onClick={() => setShow(true)}
                aria-controls="basic-navbar-nav"
              />
              <Container className="xs-px-0 xs-mx-0" id="basic-navbar-nav">
                {show && (
                  <div
                    className="p-relative"
                    style={{ height: '100vh', background: 'rgba(0,0,0,.0)' }}
                  >
                    <div ref={ref}>
                      <Col className="w-100 px-0 px-md-2 px-lg-2 p-absolute background-transparent">
                        <Route
                          render={({ history }) => (
                            <SearchBox history={history} />
                          )}
                        />
                      </Col>
                      <Nav className="ml-auto p-absolute">
                        <LinkContainer
                          to="/cart"
                          onClick={() => setShow(false)}
                        >
                          <Nav.Link className="d-flex align-items-center">
                            <h5 className="text-light mr-md-2">
                              <i className="fas fa-shopping-cart pr-3 " />
                              Cart
                            </h5>
                          </Nav.Link>
                        </LinkContainer>
                        <Row>
                          <h5 className=" inline bg-dark text-light">
                            <i className="fas fa-user ml-3 py-2 pl-1 pr-3 pr-md-1 ml-lg-4 mr-md-1 mt-md-1 pt-md-2 "></i>
                          </h5>
                          {userInfo ? (
                            <h5 className="bg-dark text-light">
                              <NavDropdown
                                className="bg-dark mb-0 pb-0 text-light"
                                title={userInfo.name}
                                id="username"
                              >
                                <LinkContainer
                                  className="bg-dark pt-3 mt-n3 text-light"
                                  to="/profile"
                                  onClick={() => setShow(false)}
                                >
                                  <NavDropdown.Item className="bg-dark text-light">
                                    <h6 className=" bg-dark text-light mt-0 pt-0">
                                      Profile
                                    </h6>
                                  </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item
                                  className="bg-dark pb-3 mb-n3"
                                  onClick={logoutHandler}
                                >
                                  <h6 className="text-light">Logout</h6>
                                </NavDropdown.Item>
                              </NavDropdown>
                            </h5>
                          ) : (
                            <LinkContainer
                              className="text-light"
                              to="/login"
                              onClick={() => setShow(false)}
                            >
                              <Nav.Link>
                                <h5 className="text-light">Sign In</h5>
                              </Nav.Link>
                            </LinkContainer>
                          )}
                        </Row>
                        {userInfo && userInfo.isAdmin && (
                          <NavDropdown
                            className="h5"
                            style={{ background: 'transparent' }}
                            title="Admin"
                            id="adminmenu"
                          >
                            <LinkContainer
                              className="h5 text-light"
                              to="/admin/userlist"
                              onClick={() => setShow(false)}
                            >
                              <NavDropdown.Item>Users</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer
                              className="h5 text-light"
                              to="/admin/productlist"
                              onClick={() => setShow(false)}
                            >
                              <NavDropdown.Item>Products</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer
                              className="h5 text-light"
                              to="/admin/orderlist"
                              onClick={() => setShow(false)}
                            >
                              <NavDropdown.Item className="h2">
                                Orders
                              </NavDropdown.Item>
                            </LinkContainer>
                          </NavDropdown>
                        )}
                      </Nav>
                    </div>
                  </div>
                )}
              </Container>
            </Container>
          </Navbar>
        </header>
      ) : (
        <header>
          <Navbar
            className="d-flex align-items-center py-3 acenter"
            bg="dark"
            variant="dark"
            expand="lg"
            collapseOnSelect
          >
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand href="/">ProShop</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                className="xs-px-0 xs-mx-0"
                id="basic-navbar-nav"
              >
                <Col className="w-100 px-0 px-md-2 px-lg-2">
                  <Route
                    render={({ history }) => <SearchBox history={history} />}
                  />
                </Col>
                <Nav className="ml-auto">
                  <LinkContainer to="/cart">
                    <Nav.Link className="d-flex align-items-center">
                      <h5 className="text-light mr-md-2">
                        <i className="fas fa-shopping-cart pr-3 " />
                        Cart
                      </h5>
                    </Nav.Link>
                  </LinkContainer>
                  <Row>
                    <h5 className=" inline bg-dark text-light">
                      <i className="fas fa-user ml-3 py-2 pl-1 pr-3 pr-md-1 ml-lg-4 mr-md-1 mt-md-1 pt-md-2 "></i>
                    </h5>
                    {userInfo ? (
                      <h5 className="bg-dark text-light">
                        <NavDropdown
                          className="bg-dark mb-0 pb-0 text-light"
                          title={userInfo.name}
                          id="username"
                        >
                          <LinkContainer
                            className="bg-dark pt-3 mt-n3 text-light"
                            to="/profile"
                          >
                            <NavDropdown.Item className="bg-dark text-light">
                              <h6 className=" bg-dark text-light mt-0 pt-0">
                                Profile
                              </h6>
                            </NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item
                            className="bg-dark pb-3 mb-n3"
                            onClick={logoutHandler}
                          >
                            <h6 className="text-light">Logout</h6>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </h5>
                    ) : (
                      <LinkContainer className="text-light" to="/login">
                        <Nav.Link>
                          <h5 className="text-light">Sign In</h5>
                        </Nav.Link>
                      </LinkContainer>
                    )}
                  </Row>
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="adminmenu">
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/productlist">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      )}
    </>
  );
};

export default Header;
