import { useState, useEffect } from "react";
import { API_URL } from "../../stores/apiUrl";
import { Link } from "react-router-dom";

const Properties = () => {
  const [properties, setProperties] = useState([])
  const [selectedProperties, setSelectedProperties] = useState([])
  const [city, setCity] = useState('')



 // RECUPERER LES DONNEES POUR LA LISTE
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
        setProperties(reversedData);
        setSelectedProperties(reversedData);
      } else {
        throw new Error('Erreur lors de la requête');
      }
    } catch (error) {
      console.error('Erreur de requête : ', error)
    }
  };
  fetchData()
}, []);

const searchByCity = (e) => {
  e.preventDefault();

  if (city !== "") {
    setSelectedProperties(properties.filter(element => element.city && element.city.toLowerCase().includes(city.toLowerCase())))
  } else {
    setSelectedProperties(properties)
  }
}


  return (
    <div>
      <h1> Trier par ville </h1>
      <div>
        <form onSubmit={searchByCity}>
          <input
            type="text"
            placeholder="Ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Rechercher</button>
        </form>
      </div>
      <div>
        {selectedProperties.length > 0 ? (
          <>
            <h3>Voici la liste des biens</h3>
            {selectedProperties.map((property) => {
              return (
                <div key={property.id}>
                  <p>annonce n° : {property.id}</p>
                  <p>titre : {property.title} </p>
                  <p>description : {property.description}</p>
                  <p>prix : {property.price}</p>
                  <p> ville : {property.city} </p>
                  <p><img src={property.image} alt={property.title} /> </p>
                  <Link to={`/property/${property.id}`}>en savoir plus</Link>
                  <p>*******************</p>
                </div>
              );
            })}
          </>
        ) : (
          <p>aucune propriété dans cette ville</p>
        )}
      </div>
    </div>
  );
}

export default Properties
