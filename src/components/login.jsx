import { useState } from "react";
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(usuario === 'admin' && password === '1234') {
      login(usuario);
      navigate('/');
      alert(`logueado exitosamente como ${usuario}`);
    } else {
      alert('Credenciales incorrectas');
    }
  }; 

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesion</h2>
      <div>
        <label>Usuario:</label>
        <input 
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)} />
        <label htmlFor="">Contrasena</label>
        <input 
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">ingresar</button>
    </form>
  )
}

export default Login;