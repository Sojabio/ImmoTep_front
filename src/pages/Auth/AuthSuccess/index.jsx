import { Link } from "react-router-dom"
import Button from "react-bootstrap/esm/Button"

const AuthSuccess = () => {
  return (
    <div className="body">
    <div className="form-success">
      <p>Authentification réussie !</p>
    <Link to="/">
        <Button className="submit-button">Rendez-vous sur la page d'accueil </Button>
    </Link>
    </div>
    </div>
  )
}

export default AuthSuccess
