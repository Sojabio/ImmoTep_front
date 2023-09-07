import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/userAtom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../../stores/apiUrl';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './style.css'
// import { Link } from 'react-router-dom';


function Login() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const regex = new RegExp("[a-zA-Z0-9.+-]+@[a-zA-Z]+.[a-zA-Z]{2,3}");


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(API_URL+'/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set('token', response.headers.get("Authorization"));
        Cookies.set('id', data.user.id);
        if (data.user.is_admin === true) {
          Cookies.set('isAdmin', data.user.is_admin);
          setUser({
            isAdmin: true,
            isLoggedIn: true,
            token: response.headers.get("Authorization"),
            id: data.user.id
          });
        } else {
          setUser({
            isAdmin: false,
            isLoggedIn: true,
            token: response.headers.get("Authorization"),
            id: data.user.id
          });
        }
        navigate('/authsuccess')
        console.log("authentification réussie")
        console.log(response.headers.get("Authorization"))
      } else {
        setError('Identifiants invalides');
      }
    } catch (error) {
      setError('Une erreur s\'est produite');
    }
  };

  const resetpassword = () => {
    if (regex.test(email)) {
      const data = {
        user: {
          email: email,
        },
      };
      fetch(API_URL + "/users/password", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => navigate("/resetpwd"));
    } else {
      setError(
        "Entrez une adresse email valide afin de changer votre mot de passe."
      );
    }
  };

  return (
    <div className="body center-form">
      <Form onSubmit={handleLogin}>
        <div className="form-title"> Connexion </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {error && <p>{error}</p>}
          <Form.Control
          className='form-border'
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className='form-border'
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="center-button">
          <Button type="submit" className="submit-button ">Se connecter</Button>
        </div>
      </Form>
      <div className="center-button">
        <p className="reset-pwd" onClick={() => resetpassword()}>Mot de passe oublié ?</p>
      </div>
    </div>
  );

}

export default Login;
