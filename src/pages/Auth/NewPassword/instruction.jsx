import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'

const ResetPwdInstruction = () => {
  return (
    <div className="form-success" >
    <div> Un message vient d'être envoyé à votre adresse email pour la réinitialisation de votre mot de passe </div>
    <Link to="/">
        <Button className="submit-button">Souhaitez-vous retourner sur la page d'accueil ? </Button>
    </Link>
    </div>
  )
}

export default ResetPwdInstruction
