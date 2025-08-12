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
    const indicadorProductos = productosCarrito.reduce((total, producto) => {return total + producto.cantidad}, 0);

    return(
        <Navbar expand="lg" className="bg-primary sticky-top" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">la tienda</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={'/'}>INICIO</Nav.Link>
                        <Nav.Link as={Link} to={'/productos'}>PRODUCTOS</Nav.Link>
                        {admin ? <Nav.Link as={Link} to={'/admin/agregar'}>ADMIN</Nav.Link> : <></>}
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to={'/carrito'} className='position-relative'><i className={productosCarrito.length > 0 ? "bi bi-cart-fill fs-5" : "bi bi-cart fs-5"}></i>{productosCarrito.length > 0 ? <span className='position-absolute top-50 start-50 translate-middle text-primary' style={{fontSize: '.75rem'}}>{indicadorProductos}</span> : ''}</Nav.Link>
                        <Nav.Link as={Link} to={'/login'}>{user ? <i class="bi bi-person-fill-check fs-5"></i> : <i className="bi bi-person-fill fs-5"></i>}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>
    );
};

export default Barra;