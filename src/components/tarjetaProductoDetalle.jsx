import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";

function TarjetaProductoDetalle({}) {
    const {agregarAlCarrito} = useContext(CarritoContext);
    const {id} = useParams();
    const {obtenerProducto, productoEncontrado, eliminarProducto} = useProductosContext();
    const {admin} = useAuthContext();
    //const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const navigate = useNavigate();

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

        if (cargando) {
            return <p>Cargando...</p>
        };
        if (error) {
            return <p>{error}</p>;
        }
        if (!productoEncontrado) {
            return null;
        }

    function funcionCarrito() {
        agregarAlCarrito({...productoEncontrado, cantidad})
    };

    function sumarCantidad() {
        setCantidad(cantidad + 1);        
    };

    function restarCantidad() {
        cantidad === 1 ? setCantidad = 1 : setCantidad(cantidad - 1);
    };

    const handleEliminar = () => {
        if(confirm(`Se eliminara ${productoEncontrado.nombre} de la lista de productos. Estas seguro?`)) {
            eliminarProducto(productoEncontrado);
            setTimeout(() => {
                navigate('/productos', {replace : true});
            }, 1000);            
        };
    };



    return(
        <div className='tarjeta' key={productoEncontrado.id}>
            <img src={productoEncontrado.imagen} alt={'foto de '+productoEncontrado.nombre}/>
            <h2>{productoEncontrado.nombre}</h2>
            <p className='descripcion'>{productoEncontrado.descripcion}</p>
            <p className='precio'>${productoEncontrado.precio}</p>
            <div className='botonera'> 
                {admin ? <Link to={'/admin/editar/' + id}><button>editar producto</button></Link>: <button onClick={funcionCarrito}>agregar al carrito</button>}
                {admin ? <button onClick={handleEliminar}>eliminar producto</button> : <div>
                    <input type="number" name="cantidad" id="" value={cantidad} min='0'/>
                    <button onClick={sumarCantidad}>+</button>
                    <button onClick={restarCantidad}>-</button>
                </div>}
            </div>
        </div>
    )
}

export default TarjetaProductoDetalle;