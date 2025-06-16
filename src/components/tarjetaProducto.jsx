import { useState } from 'react';
import '../estilos/tarjetaProducto.css'

function Tarjeta({producto, funcionCarrito}) {

    const [cantidad, setCantidad] = useState(1);

    function agregarAlCarrito() {
        funcionCarrito({...producto, cantidad});
    };

    function sumarCantidad() {
        setCantidad(cantidad + 1);        
    };

    function restarCantidad() {
        cantidad === 1 ? setCantidad = 1 : setCantidad(cantidad - 1);
    };

    return(
        <div className='tarjeta' key={producto.id}>
            <img src={producto.imagen} alt={'foto de '+producto.name}/>
            <h2>{producto.name}</h2>
            <p className='descripcion'>{producto.descripcion}</p>
            <p className='precio'>${producto.precio}</p>
            <div className='botonera'>
                
                <button onClick={agregarAlCarrito}>agregar al carrito</button>
                <div>
                    <input type="number" name="cantidad" id="" value={cantidad} min='0'/>
                    <button onClick={sumarCantidad}>+</button>
                    <button onClick={restarCantidad}>-</button>
                </div>
            </div>
        </div>
    )
}

export default Tarjeta;