import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'

const LogoutSuccess = () => {
  return (
    <>
    <div>Déconnexion réussie</div>
    <div>A bientôt sur ImmoTep ! </div>
    <Link to="/">
        <Button>Souhaitez-vous retourner sur la page d'accueil ? </Button>
    </Link>
    </>
  )
}

export default LogoutSuccess
