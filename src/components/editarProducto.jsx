import { useParams } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useEffect, useState } from "react";
import { validarFormulario } from '../helpers/validarFormulario';
function EditarProducto() {
    const {id} = useParams();
    const {obtenerProducto, productoEncontrado, actualizarProducto} = useProductosContext();
    const [producto, setProducto] = useState(productoEncontrado);
    const [cargando, setCargando] = useState(true);
    const [errores, setErrores] = useState({});

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
           if (confirm(`Modificar los datos de ${producto.nombre}?`)) {
            actualizarProducto(producto);
           };
        };
    };


  return (
    <form onSubmit={handleSubmit}>
            <h2>Agregar producto</h2>
            <label>Nombre: </label>
            <input 
                type="text"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
                required
                />
                {errores.nombre && <p style={{color: 'red'}}>{errores.nombre}</p>}
            <label>Imagen</label>
            <input 
                type="url" 
                name="imagen"
                placeholder="ingrese una url valida"
                value={producto.imagen}
                onChange={handleChange}
                />
            <label>Precio: </label>
            <input 
                type="number" 
                name="precio"
                min="0"
                value={producto.precio}
                onChange={handleChange} 
                />
                {errores.precio && <p style={{color: 'red'}}>{errores.precio}</p>}
            <label>Descripcion: </label>
            <textarea 
                name="descripcion"
                placeholder="la descripcion debe tener como minimo 10 caracteres"
                value={producto.descripcion}
                onChange={handleChange}
                >    
                </textarea>
                {errores.descripcion && <p style={{color: 'red'}}>{errores.descripcion}</p>}
            <button 
                type="submit"
                >Guardar
            </button>
        </form>
  )
};

export default EditarProducto;