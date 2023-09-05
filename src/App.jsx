import './App.css'
import { useAtom } from 'jotai';
import { userAtom } from './stores/userAtom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

//pages
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import NewPassword from './pages/Auth/NewPassword'
import NewPwdSuccess from './pages/Auth/NewPassword/success';
import AuthSuccess from './pages/Auth/AuthSuccess'
import LogoutSuccess from './pages/Auth/LogoutSuccess'
import Home from './pages/Home';
import ShowProperty from './components/Properties/show';
import MyProperties from './pages/MyProperties';
import CreateProperty from './pages/MyProperties/create';
import UpdateProperty from './pages/MyProperties/update';
import DashboardAdmin from './pages/Admin/Dashboard';
import UpdateUserInfo from './pages/UserInfo/update';

//components
import NavBar from './components/Navbar'



function App() {
  const [user] = useAtom(userAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    const isAdmin = Cookies.get('isAdmin');

    if (token) {
      setUser({
        id: id,
        isAdmin: isAdmin,
        isLoggedIn: true,
        token: token,
      });
    }
  }, []);

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/property/:id" element={<ShowProperty/>}/>
          <Route path="/myproperties/:id" element={<MyProperties/>}/>
          <Route path="/createproperty" element={<CreateProperty/>}/>
          <Route path="updateproperty/:id" element={<UpdateProperty/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/new_password/:token" element={<NewPassword />} />
          <Route path="/newpwdsuccess" element={<NewPwdSuccess/>}/>
          <Route path="/authsuccess" element={<AuthSuccess/>} />
          <Route path="/logoutsuccess" element={<LogoutSuccess/>} />
          <Route path="/dashboardadmin" element={<DashboardAdmin/>} />
          <Route path="/updateuser/:id" element={<UpdateUserInfo/>} />

        </Routes>
      </Router>

    </>
  )
}

export default App
