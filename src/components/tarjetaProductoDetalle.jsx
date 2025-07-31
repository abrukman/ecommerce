import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Form, Image, Modal, Row } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';


function TarjetaProductoDetalle({}) {
    const {agregarAlCarrito} = useContext(CarritoContext);
    const {id} = useParams();
    const {obtenerProducto, productoEncontrado, eliminarProducto} = useProductosContext();
    const {admin} = useAuthContext();
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    const handleAceptar = () => {
        eliminarProducto(productoEncontrado);
        toggleShow();
        setTimeout(() => {
                navigate('/productos', {replace : true});
            }, 1000);
    }
    

    useEffect(() => {
            obtenerProducto(id)
            .then(() => {
                setCargando(false);
            })
            .catch((error) => {
                setError(error.message);
                setCargando(false);
            })
        },[id]);

        if (cargando) {
            return <p>Cargando...</p>
        };
        if (error) {
            return <p>{error}</p>;
        }
        if (!productoEncontrado) {
            return null;
        }

    function funcionCarrito() {
        agregarAlCarrito({...productoEncontrado, cantidad})
    };

    function sumarCantidad() {
        setCantidad(cantidad + 1);        
    };

    function restarCantidad() {
        cantidad === 1 ? setCantidad = 1 : setCantidad(cantidad - 1);
    };

    return(
        <Container className="mx-auto position-absolute top-50 start-50 translate-middle " key={productoEncontrado.id}>
            <Row xs={1} md={2} className="mx-auto w-75">
                <Col className="d-flex justify-content-end py-2">
                    <Image rounded fluid src={productoEncontrado.imagen} />
                </Col>
                <Col className="d-flex justify-content-start"> 
                    <Row className="d-flex flex-column">
                        <Col>
                            <h2>{productoEncontrado.nombre}</h2>
                            <p>
                            {productoEncontrado.descripcion}
                            </p>
                        </Col>
                        <Col className="flex-grow-0 justify-content-end mb-2">
                            <span className="fs-4 fw-bold">${productoEncontrado.precio}</span>
                            <ButtonToolbar className="row d-flex flex-column flex-lg-row g-2">
                                <Col md={12} lg={4}>
                                    {admin ? <Link to={'/admin/editar/' + id}><Button className="w-100"  variant='warning'><i class="bi bi-pencil-square"></i></Button></Link> : <Button   className='w-100' variant='primary' onClick={funcionCarrito}><i class="bi bi-cart-plus fs-5"></i></Button>}
                                </Col>
                                <Col md={12} lg={4}>
                                    {admin ? <Button className="w-100"
                                            variant='danger'
                                            onClick={toggleShow}
                                            ><i class="bi bi-trash3-fill"></i>
                                        </Button> :
                                    <ButtonGroup className="h-100">
                                        <Button variant='secondary' onClick={restarCantidad}>-</Button>
                                        <Form.Control type="number" name="cantidad" id="" value={cantidad}
                                            style={{
                                            WebkitAppearance: 'none',
                                            MozAppearance: 'textfield',
                                            maxWidth: '35%'
                                        }}/>
                                        <Button variant='secondary' onClick={sumarCantidad}>+</Button>
                                    </ButtonGroup>}
                                </Col>
                            </ButtonToolbar>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Body>
                {`Se eliminará ${productoEncontrado.nombre}.`}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={toggleShow}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleAceptar}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
    </Container>
    )
}

export default TarjetaProductoDetalle;
