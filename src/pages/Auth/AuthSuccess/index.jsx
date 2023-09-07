import { Link } from "react-router-dom"
import Button from "react-bootstrap/esm/Button"

const AuthSuccess = () => {
  return (
    <>
    <div>Authentification réussie ! </div>
    <Link to="/">
        <Button>Rendez-vous sur la page d'accueil !</Button>
    </Link>
    </>
  )
}

export default AuthSuccess
