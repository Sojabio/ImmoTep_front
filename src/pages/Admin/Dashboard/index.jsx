import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from "../../../stores/apiUrl";

const DashboardAdmin = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/properties`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const jsonData = await response.json();
          const sortedData = jsonData.sort((a, b) => b.id - a.id);
          setProperties(sortedData);
        } else {
          throw new Error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error('Erreur de requête : ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchOwnerEmails = async () => {
      const propertiesWithOwnerEmails = await Promise.all(properties.map(async property => {
        const response = await fetch(`${API_URL}/user/${property.user_id}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const userData = await response.json();
          property.user = userData; 
        }
        return property;
      }));
      setProperties(propertiesWithOwnerEmails);
    };

    fetchOwnerEmails();
  }, [properties]);

  return (
    <div>
      <h1>Liste des Biens</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Email du Propriétaire</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(property => (
            <tr key={property.id}>
              <td>{property.id}</td>
              <td>
                <Link to={`/property/${property.id}`}>{property.title}</Link>
              </td>
              <td>{property.user?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardAdmin;
