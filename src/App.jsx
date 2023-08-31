import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

//pages
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import NewPassword from './pages/Auth/NewPassword'
import AuthSuccess from './pages/Auth/AuthSuccess'
import LogoutSuccess from './pages/Auth/LogoutSuccess'

//components
import NavBar from './components/Navbar'


function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/newpassword" element={<NewPassword/>} />
          <Route path="/authsuccess" element={<AuthSuccess/>} />
          <Route path="/logoutsuccess" element={<LogoutSuccess/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
