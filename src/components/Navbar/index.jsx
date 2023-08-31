import { Link } from 'react-router-dom';

import { userAtom } from '../../stores/userAtom';
import {useAtom} from 'jotai'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import LogoutButton from '../Auth/Logout';

const NavBar = () => {
  const [userInfo] = useAtom(userAtom);

  return (
    <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to="/">ImmoTep</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Les biens</Nav.Link>
            {userInfo.isLoggedIn ? (
          <>
            <Nav.Link as={Link} to={`/myproperties/${userInfo.id}`}>Profil</Nav.Link>
            <LogoutButton />
          </>
            ) : (
          <>
            <Nav.Link as={Link} to="/register">S'inscrire</Nav.Link>
            <Nav.Link as={Link} to="/login">Se connecter</Nav.Link>
          </> )}
          </Nav>
        </Container>
      </Navbar>
  )
}



export default NavBar
