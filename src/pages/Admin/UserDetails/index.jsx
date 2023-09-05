import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../stores/apiUrl';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);

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
  }, [id]);

  return (
    <div>
      {user ? (
        <div>
          <h2>Informations de l'utilisateur {user.id}</h2>
          <p>Email : {user.email}</p>
          {formattedDate && <p>Date d'inscription : {formattedDate}</p>}
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default UserDetails;
