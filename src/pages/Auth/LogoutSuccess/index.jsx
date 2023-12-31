import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'

const LogoutSuccess = () => {
  return (
    <div className="form-success" >
    <div>Déconnexion réussie</div>
    <div>A bientôt sur ImmoTep ! </div>
    <Link to="/">
        <Button className="submit-button">Souhaitez-vous retourner sur la page d'accueil ? </Button>
    </Link>
    </div>
  )
}

export default LogoutSuccess
