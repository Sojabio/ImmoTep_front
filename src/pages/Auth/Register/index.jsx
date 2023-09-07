import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/userAtom';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { API_URL } from '../../../stores/apiUrl';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register () {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_Confirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(API_URL+'/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set('token', response.headers.get("Authorization"));
        Cookies.set('id', data.user.id);

        setUser({
          isAdmin: false,
          isLoggedIn: true,
          token: response.headers.get("Authorization"),
          id: data.user.id
        });

        navigate('/authsuccess')
      } else {
        setError('Erreur lors de la création du compte');
      }
    } catch (error) {
      setError('Erreur lors de la création du compte');
    }
  };

  return (
    <div className="body center-form" >
      <Form onSubmit={handleSubmit}>
      <div className="form-title">Créer un compte</div>
      <Form.Group className="mb-3" controlId="formEmail">
        {error && <p>{error}</p>}
        <Form.Control
          className='form-border'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Control
          className='form-border'
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPasswordConfirmation">
        <Form.Control
          className='form-border'
          type="password"
          placeholder="Confirmer le mot de passe"
          value={password_confirmation}
          onChange={(e) => setPassword_Confirmation(e.target.value)}
          required
        />
      </Form.Group>
      <div className="center-button">
      <Button className="submit-button" type="submit">Créer et se connecter </Button>
      </div>
    </Form>
  </div>
  )
}

export default Register;
