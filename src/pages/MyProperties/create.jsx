import { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { userAtom } from '../../stores/userAtom';
import { API_URL } from '../../stores/apiUrl';

function CreateProperty() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();



  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProperty = {
      property: {
        title: title,
        price: price,
        description: description,
        user_id: user.id
      }
    };

    try {
      const response = await fetch(API_URL + '/properties/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newProperty),
      });

      if (response.ok) {
        console.log('Le bien a été ajouté avec succès');
        navigate(`/myproperties/${user.id}`)

      } else {
        console.error("Erreur lors de l'ajout du bien");
        console.log(user.token)
        console.log(user.id)
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du bien :", error);
    }
  };

  return (
    <div>
      <h2>Ajoutez un nouveau bien</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price :</label>
          <input
            type="number"
            id="content"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default CreateProperty;
