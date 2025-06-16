import { useEffect, useState } from 'react';
import '../estilos/productos.css';
import Tarjeta from "./tarjetaProducto";


function Productos({funcionCarrito}) {
    const [productos, setProductos] = useState([]);
    //const [productosCarrito, setProductosCarrito] = useState([]);
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

    {/* function funcionCarrito(producto) {
        
        const existe = productosCarrito.find(p => p.id === producto.id);
        if (existe) {
            const carritoActualizado = productosCarrito.map((p) => {
                if (p.id === producto.id) {
                    const productoActualizado = { ...p, cantidad: p.cantidad + producto.cantidad }
                    return productoActualizado;
                } else {
                    return p;
                }
            })

            setProductosCarrito(carritoActualizado);
        } else {
            setProductosCarrito([...productosCarrito, producto])
        };
    } */}

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