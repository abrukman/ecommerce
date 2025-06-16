import { useEffect, useState } from 'react';
import '../estilos/productos.css';
import Tarjeta from "./tarjetaProducto";


function Productos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://68332333c3f2222a8cb508d1.mockapi.io/productos')
        .then((respuesta) => (respuesta.json()))
        .then((datos) => {
            console.log(datos);
            setProductos(datos);
            setCargando(false);
        })
        .catch((error) => {
            console.log(error)
            setError('Hubo un problema al cargar los productos');
            setCargando(false);
        });
    },
    []);

    function funcionEnProductos(producto) {
        funcionCarrito(producto);
        alert(`agregaste ${producto.cantidad} ${producto.name} al carrito`);
    }

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
                        funcionCarrito={funcionEnProductos}    
                    />
                ))}
            </div>
        </>
    )
    }    
}

export default Productos;