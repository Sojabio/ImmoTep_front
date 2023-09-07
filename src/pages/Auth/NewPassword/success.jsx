import { Link } from "react-router-dom"
import Button from "react-bootstrap/esm/Button"
const NewPwdSuccess = () => {
  return (
    <>
    <div>Votre mdp a été modifié avec succès</div>
    <Link to="/">
        <Button>Rendez-vous sur la page d'accueil !</Button>
    </Link>
    </>
  )
}

export default NewPwdSuccess
