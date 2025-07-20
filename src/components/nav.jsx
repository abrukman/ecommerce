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
                    <Nav.Link><Link to="/carrito">CARRITO {productosCarrito.length > 0 ? productosCarrito.length : ''}</Link></Nav.Link>
                    <Nav.Link><Link to="/login">LOGIN</Link></Nav.Link>
                    {admin ? <Nav.Link><Link to="/admin/agregar">ADMIN</Link></Nav.Link> : <></>}
                </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>
    );
};

export default Barra;