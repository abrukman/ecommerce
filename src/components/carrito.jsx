import { useContext, useEffect } from 'react';
import { CarritoContext } from '../contexts/CarritoContext';
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

export default function Carrito({}) {
    const {productosCarrito, vaciarCarrito, borrarProductos, hayCarrito} = useContext(CarritoContext);
    const isMobile = useMediaQuery({maxWidth: 768});
    
    useEffect(() => {
      hayCarrito();
    }, []);

    const total = productosCarrito.reduce((subtotal, producto) => 
        subtotal + producto.precio * producto.cantidad, 0
    );

    return(
        <Container fluid>
            {productosCarrito.length > 0 ?
            <> 
                <Row className='bg-secondary text-light fw-bold p-2 align-items-end'>
                    {!isMobile && <Col></Col>}
                    <Col>producto</Col>
                    <Col>cantidad</Col>
                    <Col>precio/u</Col>
                    <Col>subtotal</Col>
                    <Col></Col>
                </Row>
                {productosCarrito.map((producto) => {
                    return(
                            <Row className='p-2 border-bottom align-items-center'>
                                {!isMobile && <Col><img className='img-fluid rounded' width={100} src={producto.imagen}/></Col>}
                                <Col>{producto.nombre}</Col>
                                <Col>{producto.cantidad}</Col>
                                <Col>${producto.precio}</Col>
                                <Col>${producto.precio*producto.cantidad}</Col>
                                <Col><Button variant='outline-danger' size='sm' onClick={() => borrarProductos(producto.id)}><i className="bi bi-trash3"></i></Button></Col>
                            </Row>
                    )
                })}
            <Row className='bg-secondary text-light fw-bold p-2'>
                {!isMobile && <Col></Col>}
                <Col></Col>
                <Col></Col>
                <Col className='ms-auto'>
                    TOTAL
                </Col>
                <Col>
                ${total}
                </Col>
                <Col>
                    <Button className='align-middle' variant='danger' onClick={vaciarCarrito}><i class="bi bi-trash3-fill"></i></Button>
                </Col>
            </Row>
            </> : 
            <Row className='justify-content-center align-items-center p-3'> 
                <Col sm={12}>
                    <h2 className='text-center text-danger'>Carrito vacío</h2>
                </Col>
            </Row>}
        </Container>
    )
}