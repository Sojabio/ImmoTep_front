import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/userAtom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './style.css'

function LogoutButton() {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({
      id: '',
      isLoggedIn: false,
      token: '',
    });

    Cookies.remove('token');
    Cookies.remove('id');
    Cookies.remove('isAdmin');
    navigate('/logoutsuccess')
  };

  return (
    <button onClick={handleLogout} className='LogoutButton'>Déconnexion</button>
  );
}

export default LogoutButton;
