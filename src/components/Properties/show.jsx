import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../stores/apiUrl";
import "./Showcard.css";


const showProperty = () => {
  const id = useParams().id
  const [property, setProperty] = useState('')
  const [owner, setOwner] = useState('')

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
        console.log(jsonData)

        fetch(API_URL + '/user/' + (jsonData.user_id), {
          method: 'get',
          headers: {
           'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((response) => {
          setOwner(response)
          console.log(response)
        })

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
    <div className="showProperty body">
      <h2>{property.title}</h2>
      {property.image ? (
        <img src={property.image} alt={property.title} />
      ) : (
        <img src="/pyramid2.png" alt={property.title} className="DefaultThumbnails" />
      )}
      <hr />
      <h4>{property.description}</h4>
      <h5>{property.price} €</h5>
      <h5>{property.city}</h5>
      <h5>contacte : {owner.email}</h5>
    </div>
  )
}

export default showProperty
