import { useContext, useEffect } from 'react';
import { CarritoContext } from '../contexts/CarritoContext';
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';

export default function Carrito({}) {
    const {productosCarrito, vaciarCarrito, borrarProductos, hayCarrito} = useContext(CarritoContext);
    
    useEffect(() => {
      hayCarrito();
    }, []);

    const total = productosCarrito.reduce((subtotal, producto) => 
        subtotal + producto.precio * producto.cantidad, 0
    );

    return(
        <Container fluid>
        
            <ListGroup variant='flush'>
                {productosCarrito.map((producto) => {
                    return(
                        <ListGroup.Item action>
                            <Row>
                                <Col><img className='img-fluid rounded' width={150} src={producto.imagen}/></Col>
                                <Col>{producto.nombre}</Col>
                                <Col>{producto.cantidad}</Col>
                                <Col>${producto.precio}</Col>
                                <Col>${producto.precio*producto.cantidad}</Col>
                                <Col><Button variant='outline-danger' size='sm' onClick={() => borrarProductos(producto.id)}><i class="bi bi-trash3"></i></Button></Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
            <Row>
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

           
            {/* <table className='table table-striped table-primary table-hover align-middle fs-6'>
                <thead>
                    {total > 0 ? <tr>
                        <th></th>
                        <th>PRODUCTO</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO/U</th>
                        <th>SUBTOTAL</th>
                        <th></th>
                    </tr> : <></>}
                </thead>
                <tbody>
                    {productosCarrito.length > 0 ? productosCarrito.map((producto) => {
            
                        return(
                            <tr className='productoRow' key={producto.id}>
                                <td><img className='img-fluid img-thumbnail rounded align-middle' src={producto.imagen} alt={'foto de '+producto.nombre} width={150}/></td>
                                <td className='align-middle'>{producto.nombre}</td>
                                <td className='align-middle'>{producto.cantidad}</td>
                                <td className='align-middle'>${producto.precio}</td>
                                <td className='align-middle'>${producto.precio*producto.cantidad}</td>
                                <td className='align-middle'><Button variant='outline-danger' size='sm' onClick={() => borrarProductos(producto.id)}><i class="bi bi-trash3"></i></Button></td>
                            </tr>
                        )
                    }) :
                    <tr><th className='align-middle text-center table-light fs-3' colSpan={6}>Carrito vacío</th></tr>}
                    {total > 0 ? <tr className='table-dark align-middle'><th></th><th></th><th></th><th>TOTAL</th><th>${total}</th><th><Button className='align-middle' variant='danger' onClick={vaciarCarrito}><i class="bi bi-trash3-fill"></i></Button></th></tr> : <></>}
                </tbody>
            </table> */}
        </Container>
    )
}