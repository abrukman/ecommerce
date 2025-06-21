import { Link } from 'react-router-dom';
import '../estilos/nav.css'
import { useContext } from 'react';
import { CarritoContext } from '../contexts/CarritoContext';

function Nav({}) {
    const {productosCarrito} = useContext(CarritoContext);

    return(
        <nav>
            <ul>
                <li><Link to="/">INICIO</Link></li>
                <li><Link to="/productos">PRODUCTOS</Link></li>
                <li><Link to="/contacto">CONTACTO</Link></li>
                <li><Link to="/carrito">CARRITO {productosCarrito.length > 0 ? productosCarrito.length : ''}</Link></li>
                <li><Link to="/login">LOGIN</Link></li>
                <li><Link to="/admin">ADMIN</Link></li>
            </ul>    
        </nav>
    ) 
};

export default Nav;