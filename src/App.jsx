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
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [adminLogueado, setAdminLogueado] = useState(false);

  function handleAdmin() {
    setAdminLogueado(!adminLogueado);
  };

  function handleUser() {
    setUsuarioLogueado(!usuarioLogueado);
  }

  function funcionCarrito(producto) {
        
        const existe = productosCarrito.find(p => p.id === producto.id);
        if (existe) {
            const carritoActualizado = productosCarrito.map((p) => {
                if (p.id === producto.id) {
                    const productoActualizado = { ...p, cantidad: p.cantidad + producto.cantidad }
                    return productoActualizado;
                } else {
                    return p;
                }
            })

            setProductosCarrito(carritoActualizado);
        } else {
            setProductosCarrito([...productosCarrito, producto])
        };
        alert('has agregado ' + producto.cantidad + ' ' + producto.name + ' al carrito');
    };

    function borrarProductos(id) {
      setProductosCarrito(productosCarrito.filter((p) => p.id !== id))
    };

  return (
    <Router>
      <div>
        <Header />
        <Nav productosCarrito={productosCarrito}/>
        <Routes>
          <Route path='/login' element={<Login user={usuarioLogueado} admin={adminLogueado} setAdmin={handleAdmin} setUser={handleUser}/>}/>
          <Route path='/' element={<Home />}/>
          <Route path='/productos' element={<Productos />}/>
          <Route path='/contacto' element={<Contacto />}/>
          <Route path='/carrito' element={usuarioLogueado ? <Carrito productos={productosCarrito} funcionBorrar={borrarProductos}/> : <Navigate to={'/login'} replace/>}/>
          <Route path='/productos/:id' element={<TarjetaProductoDetalle funcionCarrito={funcionCarrito}/>}/>
          <Route path='/admin' element={adminLogueado ? <Admin /> : <Navigate to={'/login'} replace/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
