import { useState } from 'react'
import './App.css'
import Home from './layouts/home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Nav from './components/nav';
import Footer from './components/footer';
import Productos from './components/productos';
import Contacto from './components/contacto';
import Carrito from './components/carrito';
import TarjetaProductoDetalle from './components/tarjetaProductoDetalle';

function App() {
  const [productosCarrito, setProductosCarrito] = useState([]);

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
          <Route path='/' element={<Home />}/>
          <Route path='/productos' element={<Productos />}/>
          <Route path='/contacto' element={<Contacto />}/>
          <Route path='/carrito' element={<Carrito productos={productosCarrito} funcionBorrar={borrarProductos}/>}/>
          <Route path='/productos/:id' element={<TarjetaProductoDetalle funcionCarrito={funcionCarrito}/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
