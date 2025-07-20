import { useState } from "react";
import { validarFormulario } from "../helpers/validarFormulario";
import { useProductosContext } from "../contexts/ProductosContext";
import { Container, Row, Col, Button, Form } from "react-bootstrap";


function FormularioProducto() {
    const {agregarProducto} = useProductosContext();
    const [producto, setProducto] = useState({
        nombre:'',
        imagen:'',
        precio:'',
        descripcion:''
    });

    const [errores, setErrores] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProducto({...producto, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(validarFormulario(producto));
        const erroresValidacion = validarFormulario(producto);
        console.log(erroresValidacion);
        setErrores(erroresValidacion);
        if (Object.keys(erroresValidacion).length === 0) {
            agregarProducto(producto);
            console.log(producto);
            setProducto({
                nombre:'',
                imagen:'',
                precio:'',
                descripcion:''    
            });
            setErrores({});
        }        
    };
  
    return (
        <Container fluid className="mt-4">
            <Row className="justify-content-center">
                <Col md={12} lg={6}>
                    <Form onSubmit={handleSubmit}>
                        <h2 className="fs-3">Agregar producto</h2>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Precio: </Form.Label>
                            <Form.Control
                                type="number"
                                name="precio"
                                min="0"
                                value={producto.precio}
                                onChange={handleChange}
                                isInvalid={!!errores.precio}
                                />
                                {errores.precio && <Form.Control.Feedback type='invalid'>{errores.precio}</Form.Control.Feedback>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripcion: </Form.Label>
                            <Form.Control
                                as={"textarea"}
                                name="descripcion"
                                placeholder="la descripcion debe tener como minimo 10 caracteres"
                                value={producto.descripcion}
                                onChange={handleChange}
                                isInvalid={!!errores.descripcion}
                                />
                                {errores.descripcion && <Form.Control.Feedback type='invalid'>{errores.descripcion}</Form.Control.Feedback>}
                        </Form.Group>
                        <Button className="my-3"
                            type="submit"
                            >Agregar producto
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default FormularioProducto;