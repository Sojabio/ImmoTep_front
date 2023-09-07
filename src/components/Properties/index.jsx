import React, { useState, useEffect } from "react";
import { API_URL } from "../../stores/apiUrl";
import { Link } from "react-router-dom";
import "./PropertyCard.css";

const Properties = ({ cityFilter }) => {
  const [properties, setProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);

  // RECUPERER LES DONNEES POUR LA LISTE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/properties", {
          method: "get",
          headers: {
            // 'Authorization': `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const jsonData = await response.json();
          const reversedData = jsonData.reverse();
          setProperties(reversedData);
        } else {
          throw new Error("Erreur lors de la requête");
        }
      } catch (error) {
        console.error("Erreur de requête : ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filtrer les propriétés en fonction de la ville
    if (cityFilter && cityFilter !== "") {
      setSelectedProperties(
        properties.filter((element) =>
          element.city.toLowerCase().includes(cityFilter.toLowerCase())
        )
      );
    } else {
      setSelectedProperties(properties);
    }
  }, [cityFilter, properties]);

  return (
    <div className="property-list">
      {selectedProperties.length > 0 ? (
        selectedProperties.map((property) => (
          <div key={property.id} className="property-card">
            {property.image ? (
              <img variant="top" src={property.image} alt={property.title} />
            ) : (
              <img variant="top" src="/pyramid2.png" alt={property.title} className="DefaultThumbnails"/>
            )}
            <div className="property-card-content">
              <h4>{property.title}</h4>
              <p>annonce n° : {property.id}</p>
              <p>description : {property.description}</p>
              <p>prix : {property.price}</p>
              <p>ville : {property.city} </p>
              <Link to={`/property/${property.id}`} className="property-card-link">
                en savoir plus
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>aucune propriété dans cette ville</p>
      )}
    </div>
  );
};

export default Properties;
