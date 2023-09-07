import { Link } from "react-router-dom"
import Button from "react-bootstrap/esm/Button"

const NewPwdSuccess = () => {
  return (
    <div className="body center-form">
    <div>Votre mot de passe a été modifié avec succès</div>
    <Link to="/login">
        <Button className="submit-button">Connectez-vous !</Button>
    </Link>
    </div>
  )
}

export default NewPwdSuccess
