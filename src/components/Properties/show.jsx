import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../stores/apiUrl";
import { Link } from "react-router-dom";

const showProperty = () => {
  const [property, setProperty] = useState([])
  const id = useParams().id


 // RECUPERER LES DONNEES POUR LA LISTE
 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL + "/properties/" + id, {
        method: 'get',
        headers: {
          // 'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const jsonData = await response.json();
        setProperty(jsonData);
      } else {
        throw new Error('Erreur lors de la requête');
      }
    } catch (error) {
      console.error('Erreur de requête : ', error)
    }
  };
  fetchData()
}, []);



return (
  <div>
    <h3>Voici les informations sur ce bien </h3>
      <p>bien n° : {property.id}</p>
      <p>titre : {property.title} </p>
      <p>description : {property.description}</p>
      <p>prix : {property.price}</p>
      <p>*******************</p>
    </div>
)
}

export default showProperty
