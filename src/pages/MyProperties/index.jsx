import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { API_URL } from "../../stores/apiUrl";


import UpdateProperty from "./update";
import DestroyProperty from "../../components/MyProperties/destroy";

const MyProperties = () => {
  const id = useParams().id;
  const [myProperties, setMyProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/properties", {
          method: 'get',
          headers: {
            // 'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const jsonData = await response.json();
          const reversedData = jsonData.reverse();
          setMyProperties(reversedData.filter(element => element.user_id == id))
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
    <>
    <div>Mes annonces</div>
    {myProperties.map(property => {
        return (
          <div key={property.id}>
            <p>annonce n° : {property.id}</p>
            <p>titre : {property.title} </p>
            <p>description : {property.description}</p>
            <p>prix : {property.price}</p>
            <Link to={`/updateproperty/${property.id}`}>Modifier ce bien</Link>
            <p> <DestroyProperty propertyId={property.id}/> </p>
            <p>*******************</p>
          </div>
        )
      })}
      <Link to="/createproperty">Ajouter un bien</Link>
    </>
  )
}

export default MyProperties
