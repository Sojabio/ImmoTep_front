import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API_URL } from "../../../stores/apiUrl";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();
  const { token } = useParams()
  console.log(token)

  const setNewpassword = async(e) => {
    e.preventDefault();

    const data = {
      user: {
        reset_password_token: token,
        password: password,
        password_confirmation: passwordConfirmation,
      },
    };

    try {
      const response = await fetch(API_URL + '/users/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Le mdp a été modifié avec succès');
        navigate("/newpwdsuccess");
      } else {
        console.error("Erreur lors de la modification du mdp");
        console.log(token)
        console.log('API Response:', response);
      }
    } catch (error) {
      console.error("Erreur lors de la modification du mdp :", error);
    }
  }


  return (
    <div className="body center-form">
      <p>Choisissez un nouveau mot de passe :</p>
      <Form onSubmit={setNewpassword}>
      <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control
           className="form-border"
            type="password"
            placeholder="nouveau mot de passe"
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPasswordConfirmation">
          <Form.Control
           className="form-border"
            type="password"
            placeholder="confirmation"
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
        </Form.Group>
        <div className="center-button">
          <Button className="submit-button" type="submit">
            Modifier
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default NewPassword
