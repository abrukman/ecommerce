import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TarjetaProductoDetalle({funcionCarrito}) {
    const {id} = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
            fetch('https://68332333c3f2222a8cb508d1.mockapi.io/productos')
            .then((respuesta) => (respuesta.json()))
            .then((datos) => {
                const productoEncontrado = datos.find((item) => item.id === id);
                console.log(productoEncontrado)
                if (productoEncontrado) {
                    setProducto(productoEncontrado);
                    console.log(productoEncontrado);
                } else {
                    setError('producto no encontrado');
                }
                setCargando(false);
                })
            .catch((error) => {
                console.log(error)
                setError('Hubo un problema al cargar el producto');
                setCargando(false);
            });
        },
        [id]);

        if (cargando) {
            return <p>Cargando...</p>
        };
        if (error) {
            return <p>{error}</p>;
        }
        if (!producto) {
            return null;
        }

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

export default TarjetaProductoDetalle;