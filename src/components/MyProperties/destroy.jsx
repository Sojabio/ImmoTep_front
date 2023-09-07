import { useAtom } from 'jotai'
import { userAtom } from "../../stores/userAtom";
import { API_URL } from "../../stores/apiUrl";

import Button from 'react-bootstrap/esm/Button';

const DestroyProperty = ({propertyId, onDelete}) => {
  const [user] = useAtom(userAtom);
  const id = propertyId

  const handleDestroy = async () => {
    try {
      const response = await fetch(API_URL + '/properties/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
      });

      if (response.ok) {
        console.log('Property deleted successfully');
        onDelete();
      } else {
        console.log('Failed to delete property');
      }
    } catch (error) {
      console.error('An error occurred while deleting property:', error);
    }
  }


  return (
    <Button onClick={handleDestroy}>Supprimer ce bien</Button>
  )
}

export default DestroyProperty
