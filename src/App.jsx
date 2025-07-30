import { useEffect, useState } from 'react'
import Home from './layouts/home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Barra from './components/nav';
import Footer from './components/footer';
import Productos from './components/productos';
import Contacto from './components/contacto';
import Carrito from './components/carrito';
import TarjetaProductoDetalle from './components/tarjetaProductoDetalle';
import Login from './components/login';
import { useAuthContext } from './contexts/AuthContext';
import FormularioProducto from './components/formularioProducto';
import EditarProducto from './components/editarProducto';
import { Helmet } from 'react-helmet';

function App() {
  const {user, admin, isLoged} = useAuthContext();

useEffect(() => {
  isLoged();
}, []);


  return (
    <>
      <Helmet>
        <meta charSet='utf8'/>
        <title>la tienda del judío pobre | eTienda oficial de barbacoaj</title>
      </Helmet>
      <Router>
        <div>
          <Barra />
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/' element={<Home />}/>
            <Route path='/productos' element={<Productos />}/>
            <Route path='/contacto' element={<Contacto />}/>
            <Route path='/carrito' element={user ? <Carrito /> : <Navigate to={'/login'} replace/>}/>
            <Route path='/productos/:id' element={<TarjetaProductoDetalle />}/>
            <Route path='/admin/agregar' element={admin ? <FormularioProducto /> : <Navigate to={'/login'} replace />}/>
            <Route path='/admin/editar/:id' element={admin ? <EditarProducto /> : <Navigate to={'/login'} replace/>}/>
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App;
