import { useNavigate, useParams } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useEffect, useState } from "react";
import { validarFormulario } from '../helpers/validarFormulario';
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
function EditarProducto() {
    const {id} = useParams();
    const {obtenerProducto, productoEncontrado, actualizarProducto} = useProductosContext();
    const [producto, setProducto] = useState(productoEncontrado);
    const [cargando, setCargando] = useState(true);
    const [errores, setErrores] = useState({});
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    const handleAceptar = () => {
        actualizarProducto(producto);
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

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProducto({...producto, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const erroresValidacion = validarFormulario(producto);
        setErrores(erroresValidacion);
        if(Object.keys(erroresValidacion).length === 0) {
            toggleShow();
           };
        };
    


    return (
        <Container fluid className="mt-4">
            <Row className="justify-content-center">
                <Col md={12} lg={6} >
                    <Form onSubmit={handleSubmit}>
                            <h2 className="fs-3">Editar producto</h2>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre: </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={producto.nombre}
                                    onChange={handleChange}
                                    required
                                    isInvalid={!!errores.nombre}
                                    />
                                    {errores.nombre && <Form.Control.Feedback type='invalid'>{errores.nombre}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control
                                    type="url"
                                    name="imagen"
                                    placeholder="ingrese una url valida"
                                    value={producto.imagen}
                                    onChange={handleChange}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mb-3">Precio: </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="precio"
                                    min="0"
                                    value={producto.precio}
                                    onChange={handleChange}
                                    required
                                    isInvalid={!!errores.precio}
                                    />
                                    {errores.precio && <Form.Control.Feedback type='invalid'>{errores.precio}</Form.Control.Feedback>}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción: </Form.Label>
                                <Form.Control
                                    as={'textarea'}
                                    name="descripcion"
                                    placeholder="la descripcion debe tener como minimo 10 caracteres"
                                    value={producto.descripcion}
                                    onChange={handleChange}
                                    required
                                    isInvalid={!!errores.descripcion}
                                    />
                                    {errores.descripcion && <Form.Control.Feedback type='invalid'>{errores.descripcion}</Form.Control.Feedback>}
                            </Form.Group>
                            <Button
                                className="my-3"
                                type="submit"
                                >Guardar
                            </Button>
                        </Form>
                </Col>
            </Row>
            <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Body>
            {`Se modificarán los datos de ${producto.nombre}.`}
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
  };

export default EditarProducto;