import { useState } from "react";
import { validarFormulario } from "../helpers/validarFormulario";
import { agregarProducto } from "../helpers/agregarProducto";

function FormularioProducto() {
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
                >Agregar producto
            </button>
        </form>
    )
}

export default FormularioProducto;