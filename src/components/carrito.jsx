import '../estilos/carrito.css';
export default function Carrito({productos, funcionBorrar}) {

    const total = productos.reduce((subtotal, producto) => 
        subtotal + producto.precio * producto.cantidad, 0
    );

    /* function borrarProducto(producto) {
        funcionBorrar(producto.id)
    }; */

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
                {productos.length > 0 ? productos.map((producto) => {
                
                    return(
                        <tr className='productoRow' key={producto.id}>
                            <td className='imagenCell'><img src={producto.imagen} alt={'foto de '+producto.name} /></td>
                            <td className='nombreCell'>{producto.name}</td>
                            <td>{producto.cantidad}</td>
                            <td>${producto.precio}</td>
                            <td>${producto.precio*producto.cantidad}</td>
                            <td><button onClick={() => funcionBorrar(producto.id)}>X</button></td>
                        </tr>
                    )
                }) :
                <tr><td className='vacio' colSpan={6}>Carrito vacío</td></tr>}
                {total > 0 ? <tr className='total'><td></td><td></td><td></td><td>total</td><td>${total}</td><td></td></tr> : <></>}
            </tbody>
        </table>
    )
}