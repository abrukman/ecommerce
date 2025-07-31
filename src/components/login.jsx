import { useState } from "react";
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { crearUsuario, loginConMailyPass } from "../auth/firebase";
import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import { useToastContext } from "../contexts/ToastContext";

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const { login, user, logout } = useAuthContext();
  const { showToast } = useToastContext();

  function registrarUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password)
    .then((user) => {
      login(usuario);
    })
    .catch((error) => {
      alert(error.code + ' ' + error.message);
    });
    
  }

  function loguearseConMailyPass(e) {
    e.preventDefault();
    loginConMailyPass(usuario, password)
    .then((user) => {
      login(usuario);
      showToast(`logueado exitosamente como ${usuario}`, 'success');
    })
    .catch((error) => {
      showToast(`${error.code}: ${error.message}`, 'danger');
    });
  };

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
  };
  

  if (user) {
    return (
      <Container fluid>
        <Row className="justify-content-center mt-4">
          <Col md={12} lg={2}>
            <Form onSubmit={logout}>
              <Button type="submit">Cerrar Sesión</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  } else if (!user && show) {
    return (
      <Container fluid>
        <Row className="justify-content-center mt-4">
          <Col md={12} lg={4}>
            <h2 className="fs-4">Iniciar sesión con email y contraseña</h2>
                <Form onSubmit={loguearseConMailyPass}>
                    <Form.Group>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)} />
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button className='my-3' type="submit">ingresar</Button>
                  </Form>

              <small>Si aun no estas registradx, <a className='primary'onClick={handleShow} style={{textDecoration: 'underline',cursor: 'pointer'}}>registrate</a></small>
          </Col>
        </Row>
      </Container>
    )
  } else if (!user && !show) {
    return (
      <Container fluid>
        <Row className="justify-content-center mt-4">
          <Col md={12} lg={4}>
            <h2 className="fs-4">Registrarse</h2>
            <Form onSubmit={registrarUsuario}>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)} />
                <Form.Label htmlFor="">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Button className='my-3'type="submit">registrarse</Button>
            </Form>
            <small>Si ya estas registradx, <a className='primary' onClick={handleShow} style={{textDecoration: 'underline',cursor: 'pointer'}}>inicia sesión</a></small>
          </Col>
        </Row>
      </Container>
    )
  };
};

export default Login;