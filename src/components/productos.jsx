import { useEffect, useState } from 'react';
import '../estilos/productos.css';
import Tarjeta from "./tarjetaProducto";
import { useProductosContext } from '../contexts/ProductosContext';


function Productos({}) {
    const {productos, obtenerProductos} = useProductosContext();
    //const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    {useEffect(() => {
        obtenerProductos()
        .then((productos) => {
            setCargando(false);
        })
        .catch((error) => {
            setError(error.message);
            setCargando(false);
        })
    }, [productos]);}

   /*  function funcionEnProductos(producto) {
        funcionCarrito(producto);
        alert(`agregaste ${producto.cantidad} ${producto.name} al carrito`);
    } */

    if (cargando) {
        return <p>Cargando productos...</p>;
    } else if (error) {
        return <p>{error}</p>;
    } else {
        return(
        <>
            <div className='container'>
                {productos.map((producto) => (
                    <Tarjeta 
                        producto={producto}    
                    />
                ))}
            </div>
        </>
    )
    }    
}

export default Productos;