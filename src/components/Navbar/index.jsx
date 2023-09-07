// NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { userAtom } from '../../stores/userAtom';
import { useAtom } from 'jotai';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoutButton from '../Auth/Logout';
import './style.css';

const NavBar = () => {
  const [userInfo] = useAtom(userAtom);

  return (
    <Navbar className="Navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="BrandTitle">
          ImmoTep
        </Navbar.Brand>
        <Nav className="links">
          {userInfo.isLoggedIn ? (
            <>
              {userInfo.isAdmin ? (
                <>
                  <Nav.Link as={Link} to="/dashboardadmin" className="Navlinks">
                    Dashboard admin
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to={`/myproperties/${userInfo.id}`} className="Navlinks">
                    Profil
                  </Nav.Link>
                </>
              )}
              <LogoutButton />
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/register" className="Navlinks">
                S'inscrire
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="Navlinks">
                Se connecter
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
