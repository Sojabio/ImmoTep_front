import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate, useParams} from 'react-router-dom';
import { userAtom } from '../../stores/userAtom';
import { API_URL } from '../../stores/apiUrl';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UpdateProperty() {
  const [title, setTitle] = useState(undefined);
  const [price, setPrice] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [image, setImage] = useState('');
  const [user] = useAtom(userAtom);
  const [originalData, setOriginalData] = useState([])
  const navigate = useNavigate();
  const propertyId = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/properties/" + propertyId, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const jsonData = await response.json();
          setOriginalData(jsonData);
          setTitle(jsonData.title || '');
          setPrice(jsonData.price || '');
          setDescription(jsonData.description || '');
          setCity(jsonData.city || '');
        } else {
          throw new Error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error('Erreur de requête : ', error)
      }
    };
    fetchData()
  }, []);

  function handleTitleChange(event) {
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

    const newProperty = {
      property: {
        title: title || originalData.title,
        price: price || originalData.price,
        description: description || originalData.description,
        city: city || originalData.city,
        image: image || originalData.image,
        user_id: user.id
      }
    };

    try {
      const response = await fetch(API_URL + '/properties/' + propertyId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
        body: JSON.stringify(newProperty),
      });

      if (response.ok) {
        console.log('Le bien a été  modifié avec succès');
        navigate(`/myproperties/${user.id}`)

      } else {
        console.error("Erreur lors de la modification du bien");
      }
    } catch (error) {
      console.error("Erreur lors de la modification du bien :", error);
    }
  };

  return (
    <div className="body center-form">
      <h2>Modifier ce bien</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Control
            className="form-border"
            placeholder={originalData.title}
            type="text"
            id="title"
            value={title || originalData.title}
            onChange={handleTitleChange}
          />
          </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Control
            className="form-border"
            placeholder={originalData.price}
            type="number"
            id="content"
            value={price || originalData.price}
            onChange={handlePriceChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Control
            className="form-border"
            as="textarea"
            row={3}
            placeholder={originalData.description}
            id="description"
            value={description || originalData.description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCity">
          <Form.Control
            className="form-border"
            placeholder={originalData.city}
            type="text"
            id="city"
            value={city}
            onChange={handleCityChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Modifiez l'image</Form.Label>
          <Form.Control
          className="form-border"
          type="file"
          name="image"
          onChange={handleImageChange} />
        </Form.Group>
        <div className="center-button">
          <Button className="submit-button" type="submit">Modifier</Button>
        </div>
      </Form>
    </div>
  );
}

export default UpdateProperty;
