import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../stores/apiUrl';

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

  return (
    <div>
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
        <div>
          <h2>Biens de l'utilisateur</h2>
          <ul>
            {userProperties.map((property) => (
              <li key={property.id}>{property.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
