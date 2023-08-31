import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai'
import { userAtom } from "../../stores/userAtom";
import { API_URL } from "../../stores/apiUrl";

const DestroyProperty = (propertyId) => {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);

    const handleDestroy = async () => {
    try {
      const response = await fetch(API_URL + '/properties/' + propertyId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })
      if (response.ok) {
        console.log('Le bien a été  supprimé avec succès');
        navigate(`/myproperties/${user.id}`)



      } else {
        console.log(propertyId)

        console.error("Erreur lors de la suppression du bien");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du bien :", error);
    }
  };

  return (
    <button onClick={handleDestroy}>Supprimer ce bien</button>
  )
}

export default DestroyProperty
