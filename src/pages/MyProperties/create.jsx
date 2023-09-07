import { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { userAtom } from '../../stores/userAtom';
import { API_URL } from '../../stores/apiUrl';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function CreateProperty() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState('');
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

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleImageChange = event => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
      formData.append('property[title]', title);
      formData.append('property[price]', price);
      formData.append('property[description]', description);
      formData.append('property[city]', city);
      formData.append('property[user_id]', user.id);
      formData.append('image', image);

    try {
      const response = await fetch(API_URL + '/properties', {
        method: 'POST',
        headers: {
          Authorization: `${user.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Le bien a été ajouté avec succès');
        navigate(`/myproperties/${user.id}`);
      } else {
        console.error("Erreur lors de l'ajout du bien");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du bien :", error);
    }
  }

  return (
    <div>
      <h2>Ajoutez un nouveau bien</h2>
      <Form encType="multipart/form-data" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTitle">
          <Form.Control
            type="text"
            placeholder="titre"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Control
            type="number"
            id="price"
            placeholder="prix"
            value={price}
            onChange={handlePriceChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Control
            as="textarea"
            row={3}
            id="description"
            placeholder="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCity">
          <Form.Control
            type="text"
            placeholder="ville"
            id="city"
            value={city}
            onChange={handleCityChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Ajoutez une image</Form.Label>
          <Form.Control
          type="file"
          name="image"
          onChange={handleImageChange} />
        </Form.Group>
        <Button type="submit">Ajouter</Button>
      </Form>
    </div>
  );
}

export default CreateProperty;
