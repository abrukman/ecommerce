import { useEffect, useState } from 'react';
//import '../estilos/productos.css';
import Tarjeta from "./tarjetaProducto";
import { useProductosContext } from '../contexts/ProductosContext';
import { Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';


function Productos({}) {
    const {productos, productosFiltrados, obtenerProductos, filtrarProducto} = useProductosContext();
    //const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('');
    //const { productosFiltrados } = useProductosContext();

    useEffect(() => {
        obtenerProductos()
        .then((productos) => {
            setCargando(false);
        })
        .catch((error) => {
            setError(error.message);
            setCargando(false);
        })
    }, []);

    useEffect(() => {
        //console.log(filtro);
        filtrarProducto(filtro);
    },[filtro, productos]);

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
            <Container fluid className='pb-4'>
                <Row className='my-3'>
                    <Col>
                        <Form>
                            <InputGroup>
                                <InputGroup.Text><i class="bi bi-funnel-fill"></i></InputGroup.Text>
                                <Form.Control
                                    placeholder='busqueda por nombre'
                                    aria-label='busqueda por nombre'
                                    value={filtro}
                                    onChange={(e) => setFiltro(e.target.value)}/>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row> 
                <Row sm={1} md={2} lg={3} className='my-4 g-4'>
                    {productosFiltrados.map((producto) => (
                        <Col className='d-flex justify-content-center' key={producto.id}>
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