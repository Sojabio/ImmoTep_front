import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../stores/apiUrl';
import { Link } from 'react-router-dom';
import DestroyProperty from '../../../components/MyProperties/destroy';
import './style.css';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [userProperties, setUserProperties] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        if (data.created_at) {
          const dateObj = new Date(data.created_at);
          const formatted = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
          setFormattedDate(formatted);
        }
      });

    fetch(`${API_URL}/properties?user_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserProperties(data);
      });
  }, [id]);

  const handlePropertyDeleted = (propertyId) => {
    // Mettez à jour la liste des biens après la suppression
    const updatedProperties = userProperties.filter((property) => property.id !== propertyId);
    setUserProperties(updatedProperties);
  };

  return (
    <div className='body container'>
      {user ? (
        <div>
          <h2>Informations de l'utilisateur</h2>
          <p>ID de l'utilisateur : {user.id}</p>
          <p>Email : {user.email}</p>
          {formattedDate && <p>Date d'inscription : {formattedDate}</p>}
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
      {userProperties.length > 0 && (
        <div className='array'>
          <h2>Biens de l'utilisateur</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Prix</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userProperties.map((property) => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>
                    <Link to={`/property/${property.id}`}>{property.title}</Link>
                  </td>
                  <td>{property.price}</td>
                  <td>
                    {/* Affichez le composant DestroyProperty pour chaque bien */}
                    <DestroyProperty
                      propertyId={property.id}
                      onDelete={() => handlePropertyDeleted(property.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
