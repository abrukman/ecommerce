import { useEffect, useState } from 'react';
//import '../estilos/productos.css';
import Tarjeta from "./tarjetaProducto";
import { useProductosContext } from '../contexts/ProductosContext';
import { Col, Container, Row, Spinner } from 'react-bootstrap';


function Productos({}) {
    const {productos, obtenerProductos} = useProductosContext();
    //const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    {useEffect(() => {
        obtenerProductos()
        .then((productos) => {
            setCargando(false);
        })
        .catch((error) => {
            setError(error.message);
            setCargando(false);
        })
    }, [productos]);}

    if (cargando) {
        return(
            <Container fluid>
                <Spinner
                    className='position-absolute top-50 start-50 translate-middle' 
                    variant='primary' 
                    animation='border'
                    />
            </Container>);
    } else if (error) {
        return <p>{error}</p>;
    } else {
        return(
        <>
            <Container> 
                <Row sm={1} md={2} lg={3} className='g-4 mt-2'>
                    {productos.map((producto) => (
                        <Col className='d-flex justify-content-center'>
                            <Tarjeta
                                producto={producto}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
    }    
}

export default Productos;