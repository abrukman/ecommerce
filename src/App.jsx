import { useState } from 'react'
import './App.css'
import Home from './layouts/home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header';
import Nav from './components/nav';
import Footer from './components/footer';
import Productos from './components/productos';
import Contacto from './components/contacto';
import Carrito from './components/carrito';
import TarjetaProductoDetalle from './components/tarjetaProductoDetalle';
import Login from './components/login';
import Admin from './components/admin';

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [adminLogueado, setAdminLogueado] = useState(false);

  function handleAdmin() {
    setAdminLogueado(!adminLogueado);
  };

  function handleUser() {
    setUsuarioLogueado(!usuarioLogueado);
  }

  return (
    <Router>
      <div>
        <Header />
        <Nav />
        <Routes>
          <Route path='/login' element={<Login user={usuarioLogueado} admin={adminLogueado} setAdmin={handleAdmin} setUser={handleUser}/>}/>
          <Route path='/' element={<Home />}/>
          <Route path='/productos' element={<Productos />}/>
          <Route path='/contacto' element={<Contacto />}/>
          <Route path='/carrito' element={usuarioLogueado ? <Carrito /> : <Navigate to={'/login'} replace/>}/>
          <Route path='/productos/:id' element={<TarjetaProductoDetalle />}/>
          <Route path='/admin' element={adminLogueado ? <Admin /> : <Navigate to={'/login'} replace/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
