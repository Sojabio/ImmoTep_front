import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { API_URL } from "../../stores/apiUrl";

import DestroyProperty from "../../components/MyProperties/destroy";
import './style.css'
import Button from 'react-bootstrap/Button';


const MyProperties = () => {
  const id = useParams().id;
  const [myProperties, setMyProperties] = useState([]);

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

    useEffect(() => {
    fetchData()
  }, []);

  const handlePropertyDeleted = async () => {
    // Call this function after property is successfully deleted
    await fetchData(); // Fetch updated list of properties
  };



  return (
    <div className="body">
      <div className="mini-jumbotron">Mes annonces</div>
      <div className="center-button">
        <Button className="submit-button">
          <Link className="button-link" to="/createproperty">Ajouter un bien</Link>
        </Button>
      </div>
      <div className="property-list">
        {myProperties.map(property => (
          <div key={property.id} className="property-card">
            <div className="property-card-image">
              {property.image ? (
                <img src={property.image} alt={property.title} />
              ) : (
                <img src="/pyramid2.png" alt={property.title} />
              )}
            </div>
            <div className="property-card-content">
              <h4>{property.title}</h4>
              <p>{property.description}</p>
              <p>{property.price} €</p>
              <p>{property.city}</p>
            </div>
            <div className="property-card-buttons">
              <Button className="submit-button">
                <Link className="button-link" to={`/updateproperty/${property.id}`} originaltitle={property.title}>Modifier ce bien</Link>
              </Button>
              <DestroyProperty propertyId={property.id} onDelete={handlePropertyDeleted} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );



}

export default MyProperties
