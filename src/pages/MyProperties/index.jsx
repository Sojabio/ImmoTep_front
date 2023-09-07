import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { API_URL } from "../../stores/apiUrl";

import DestroyProperty from "../../components/MyProperties/destroy";
import './style.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
    <>
    <h2>Mes annonces</h2>
    {myProperties.map(property => {
        return (
          <Card style={{ width: '18rem' }} key={property.id} >
            <Card.Img variant="top" src={property.image} alt={property.title} />
            <Card.Body>
              <Card.Title>{property.title}</Card.Title>
              <Card.Text>
              <p>{property.description}</p>
              <p> {property.price} € </p>
              <p>{property.city}</p>
              </Card.Text>
              <Button>
              <Link className="buttonLink" to={`/updateproperty/${property.id}`} originaltitle={property.title}>Modifier ce bien</Link>
              </Button>
              <DestroyProperty propertyId={property.id} onDelete={handlePropertyDeleted} />
            </Card.Body>
          </Card>
        )
      })}
      <Link to="/createproperty">Ajouter un bien</Link>
    </>
  )
}

export default MyProperties
