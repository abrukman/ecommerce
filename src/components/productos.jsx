import { useEffect, useState } from 'react';
import Tarjeta from "./tarjetaProducto";
import { useProductosContext } from '../contexts/ProductosContext';
import { Col, Container, Form, InputGroup, Pagination, Row, Spinner } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';


function Productos({}) {
    const {productos, productosFiltrados, obtenerProductos, filtrarProducto} = useProductosContext();
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('');
    const isMobile = useMediaQuery({maxWidth: 768});
    const [pagActual, setPagActual] = useState(1);
    const productosXpag = isMobile ? 4 : 9;
    const ultimoProductoIndex = pagActual * productosXpag;
    const primerProductoIndex = ultimoProductoIndex - productosXpag;
    const productosActuales = productosFiltrados.slice(primerProductoIndex, ultimoProductoIndex);
    const pagsTotales = Math.ceil(productosFiltrados.length / productosXpag);
    

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
        filtrarProducto(filtro);
    },[filtro, productos]);

    useEffect(() => {
        setPagActual(1);
    },[filtro]);

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
                    {productosActuales.map((producto) => (
                        <Col className='d-flex justify-content-center' key={producto.id}>
                            <Tarjeta
                                producto={producto}
                            />
                        </Col>
                    ))}
                </Row>
                {pagsTotales<= 1 ? <></> : <Row>
                    <Col>
                        <Pagination className='justify-content-center' size={isMobile ? 'sm' : 'undefined'}>
                            {[...Array(pagsTotales)].map((_,i) => (
                                <Pagination.Item key={i} active={(i+1) === pagActual} onClick={() => setPagActual(i+1)}>{i + 1}</Pagination.Item>
                            ))}
                        </Pagination>
                    </Col>
                </Row>}
            </Container>
        </>
    )
    }    
}

export default Productos;