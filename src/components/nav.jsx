import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../contexts/CarritoContext';
import { useAuthContext } from '../contexts/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Barra({}) {
    const {productosCarrito} = useContext(CarritoContext);
    const {user, admin} = useAuthContext();

    return(
        <Navbar expand="lg" className="bg-primary sticky-top" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">la tienda</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link to="/">INICIO</Link></Nav.Link>
                        <Nav.Link><Link to="/productos">PRODUCTOS</Link></Nav.Link>
                        {admin ? <Nav.Link><Link to="/admin/agregar">ADMIN</Link></Nav.Link> : <></>}
                    </Nav>
                    <Nav>
                        <Nav.Link><Link to="/carrito"><i class={productosCarrito.length > 0 ? "bi bi-cart-fill fs-5" : "bi bi-cart fs-5"}></i>{productosCarrito.length > 0 ? <small>{productosCarrito.length}</small> : ''}</Link></Nav.Link>
                        <Nav.Link><Link to="/login">{user ? <i class="bi bi-person-fill-check fs-5"></i> : <i class="bi bi-person-fill fs-5"></i>}</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>
    );
};

export default Barra;