import { useContext, useEffect } from 'react';
import '../estilos/carrito.css';
import { CarritoContext } from '../contexts/CarritoContext';

export default function Carrito({}) {
    const {productosCarrito, vaciarCarrito, borrarProductos, hayCarrito} = useContext(CarritoContext);
    
    useEffect(() => {
      hayCarrito();
    }, []);

    const total = productosCarrito.reduce((subtotal, producto) => 
        subtotal + producto.precio * producto.cantidad, 0
    );

    return(
        <table className='carritoContainer'>
            <thead>
                {total > 0 ? <tr>
                    <td className='encabezado'></td>
                    <td className='encabezado start'>producto</td>
                    <td className='encabezado'>cantidad</td>
                    <td className='encabezado'>precio/u</td>
                    <td className='encabezado'>subtotal</td>
                    <td className='encabezado'></td>
                </tr> : <></>}
            </thead>
            <tbody>
                {productosCarrito.length > 0 ? productosCarrito.map((producto) => {
                
                    return(
                        <tr className='productoRow' key={producto.id}>
                            <td className='imagenCell'><img src={producto.imagen} alt={'foto de '+producto.nombre} /></td>
                            <td className='nombreCell'>{producto.nombre}</td>
                            <td>{producto.cantidad}</td>
                            <td>${producto.precio}</td>
                            <td>${producto.precio*producto.cantidad}</td>
                            <td><button onClick={() => borrarProductos(producto.id)}>X</button></td>
                        </tr>
                    )
                }) :
                <tr><td className='vacio' colSpan={6}>Carrito vacío</td></tr>}
                {total > 0 ? <tr className='total'><td></td><td></td><td></td><td>total</td><td>${total}</td><td><button onClick={vaciarCarrito}>X</button></td></tr> : <></>}
            </tbody>
        </table>
    )
}