import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API_URL } from "../../../stores/apiUrl";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams()
  console.log(token)

  const setNewpassword = async(e) => {
    e.preventDefault();

    const data = {
      user: {
        reset_password_token: token,
        password: password,
        password_confirmation: password,
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
    <div>
      <h1>Modifier le mdp :</h1>
      <form onSubmit={setNewpassword}>
        <div>
          <input
            type="password"
            placeholder="nouveau mdp"
            onChange={e => setPassword(e.target.value)}
          ></input>
        </div>
        <button type="submit">
          Modifier le mdp
        </button>
      </form>
    </div>
  );
}

export default NewPassword
