import { useState } from "react";
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { crearUsuario, loginConMailyPass } from "../auth/firebase";

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const { login, user, logout } = useAuthContext();
  //const navigate = useNavigate();

  /* const handleSubmit = (e) => {
    e.preventDefault();

    if(usuario === 'admin' && password === '1234') {
      login(usuario);
      navigate('/');
      alert(`logueado exitosamente como ${usuario}`);
    } else {
      alert('Credenciales incorrectas');
    }
  }; */

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
      alert('logueado exitosamente como ' + usuario);
    })
    .catch((error) => {
      alert(error.code + ' ' + error.message);
    });
  };

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
  };
  

  if (user) {
    return (
      <form onSubmit={logout}>
        <button type="submit">Cerrar Sesion</button>
      </form>
    )
  } else if (!user && show) {
    return (
      <>
        <form onSubmit={loguearseConMailyPass}>
            <h2>Iniciar Sesion con email y contrasena</h2>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)} />
              <label>Contrasena</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">ingresar</button>
          </form>
          <small>Si aun no estas registradx, <a onClick={handleShow} style={{cursor: 'pointer'}}>registrate</a></small>
        </>

    )
  } else if (!user && !show) {
    return (
      <>
        <form onSubmit={registrarUsuario}>
          <h2>Registrarse</h2>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)} />
            <label htmlFor="">Contrasena</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">registrarse</button>
        </form>
        <small>Si ya estas registradx, <a onClick={handleShow} style={{cursor: 'pointer'}}>inicia sesion</a></small>
      </>
    )
  };
};

export default Login;